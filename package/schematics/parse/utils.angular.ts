import { Tree } from '@angular-devkit/schematics';
import { WorkspaceSchema } from '@angular-devkit/core/src/experimental/workspace';
import {
  ArrayLiteralExpression,
  CallExpression,
  ClassDeclaration,
  Expression,
  Identifier,
  Node,
  ObjectLiteralExpression,
  Project,
  PropertyAccessExpression,
  ts,
  Type,
  TypeChecker
} from 'ts-morph';
import {
  LoadChildren,
  ParsedRoute,
  RouterExpression,
  RouteTree
} from './types';
import { resolve, sep } from 'path';
import { evaluate } from '@wessberg/ts-evaluator';

export const findAngularJSON = (tree: Tree): WorkspaceSchema => {
  const angularJson = tree.read('angular.json');
  if (!angularJson) {
    throw new Error("angular.json doesn't exist");
  }

  const content = angularJson.toString();
  return JSON.parse(content) as WorkspaceSchema;
};

export const getRouterModuleClass = (project: Project): ClassDeclaration => {
  const moduleImport = project
    .getSourceFiles()
    .map(file => file.getImportDeclaration('@angular/router'))
    .filter(imp => !!imp)?.[0];

  if (!moduleImport) {
    throw new Error("RouterModule import didn't find");
  }

  const routeDef = moduleImport.getModuleSpecifierSourceFileOrThrow();
  const routerModule = routeDef.getClass('RouterModule');
  if (!routerModule) {
    throw new Error(`Can't find RouterModule in ${routeDef.getFilePath()}`);
  }

  return routerModule;
};

export const getRouteModuleForRootExpressions: (
  project: Project,
  routerModuleClass: ClassDeclaration
) => ArrayLiteralExpression | null = (
  project: Project,
  routerModuleClass: ClassDeclaration
): ArrayLiteralExpression | null => {
  const refs = routerModuleClass.findReferencesAsNodes();

  // todo add check for Router.RouterModule.for....
  const forRootExpressions = getRouterModuleCallExpressions(refs, 'forRoot');
  if (forRootExpressions.length > 1) {
    throw new Error('You have more than one RouterModule.forRoot expression');
  }

  const forRootExpression = forRootExpressions[0];
  return findRouterModuleArgumentValue(forRootExpression, project);
};

const findRouterModuleArgumentValue = (
  routerExpr: CallExpression,
  project: Project
): ArrayLiteralExpression | null => {
  const args = routerExpr.getArguments();
  if (args.length === 0) {
    const filePath = routerExpr.getSourceFile().getFilePath();
    throw new Error(`RouterModule in ${filePath} hasn't arguments`);
  }

  const firstArg = args[0];
  if (Node.isArrayLiteralExpression(firstArg)) {
    return firstArg;
  } else if (Node.isIdentifier(firstArg)) {
    return tryFindIdentifierValue(firstArg, project);
  }
  // todo for spread forRoot(...array)
  return null;
};

const tryFindIdentifierValue = (
  id: Identifier,
  project: Project
): ArrayLiteralExpression | null => {
  const refs = id.findReferencesAsNodes();

  for (const ref of refs) {
    // expression.expression1.varName
    const parent = ref.getParent();
    if (parent && Node.isVariableDeclaration(parent)) {
      const initializer = parent.getInitializer();
      if (initializer && Node.isArrayLiteralExpression(initializer)) {
        return initializer;
      }
    } else if (parent && Node.isImportSpecifier(parent)) {
      const imp = parent.getImportDeclaration();
      const modulePath = imp.getModuleSpecifier().getLiteralValue();
      const currentSourceFile = imp.getSourceFile().getFilePath();
      const absolutePath = getAbsolutePath(currentSourceFile, modulePath);
      const sourceFile = project.getSourceFileOrThrow(absolutePath);
      const value = sourceFile.getVariableDeclaration(ref.getText());
      const initializer = value?.getInitializer();

      if (initializer && Node.isArrayLiteralExpression(initializer)) {
        return initializer;
      }
    }
  }

  return null;
};

const getAbsolutePath = (
  currentFilePath: string,
  importPath: string
): string => {
  const splitted = currentFilePath.split(sep);
  const currentDir = splitted.slice(0, splitted.length - 1).join(sep);

  return resolve(currentDir, `${importPath}.ts`);
};

export const getRouterModuleCallExpressions: (
  routeModules: Node[],
  expression: RouterExpression
) => CallExpression[] = (
  routeModules: Node[],
  expression: RouterExpression
): CallExpression[] => {
  return routeModules
    .map(ref => ref.getParent() as PropertyAccessExpression)
    .filter(node => Node.isPropertyAccessExpression(node))
    .filter(node => {
      if (Node.hasName(node)) {
        return node.getName() === expression;
      }

      return false;
    })
    .map(node => node.getParent() as CallExpression)
    .filter(node => Node.isCallExpression(node));
};

export const parseRoutes = (
  routes: ArrayLiteralExpression,
  routerType: Type<ts.Type>,
  project: Project
): ParsedRoute[] => {
  const elements = routes.getElements();
  return elements
    .filter(node => Node.isObjectLiteralExpression(node))
    .map(node =>
      parseRoute(node as ObjectLiteralExpression, routerType, project)
    )
    .filter(node => !!node) as ParsedRoute[];
};

const parseRoute = (
  route: ObjectLiteralExpression,
  routerType: Type<ts.Type>,
  project: Project
): ParsedRoute | null => {
  const typeChecker = project.getTypeChecker();
  const path = readPath(route, typeChecker);
  const loadChildren = readLoadChildren(route, typeChecker);
  const children = readChildren(route, routerType, project);

  return {
    path,
    children,
    loadChildren
  };
};

export const createRouteTree = (
  project: Project,
  appModule: ClassDeclaration,
  forRootExpr: ArrayLiteralExpression,
  routerType: Type
): RouteTree => {
  const root: RouteTree = {};
  const eagerModules = findRouteChildren(project, routerType, appModule);
  parseRoutes(forRootExpr, routerType, project);
  console.log(eagerModules.map(m => m.getText()));

  return root;
};

/**
 * Get Module Declaration, parse imports, find route modules
 * and parse them
 */
export const findRouteChildren = (
  project: Project,
  routerType: Type,
  module: ClassDeclaration
) => {
  const routerModules: CallExpression[] = [];
  const modules = [module];

  while (modules.length) {
    const currentModule = modules.shift() as ClassDeclaration;
    const imports = getImportsFromModuleDeclaration(project, currentModule);
    const {
      routerExpressions,
      moduleExpressions
    } = divideRouterExpressionsAndModules(imports, routerType);

    routerModules.push(...routerExpressions);
    modules.unshift(...moduleExpressions);
  }

  return routerModules;
};

const divideRouterExpressionsAndModules = (
  modules: Node[],
  routerType: Type
) => {
  const routerExpressions: CallExpression[] = [];
  const moduleDeclarations: ClassDeclaration[] = [];

  for (const module of modules) {
    if (Node.isIdentifier(module)) {
      const decl = findModuleDeclaration(module);
      if (decl) {
        moduleDeclarations.push(decl);
      }
    } else if (Node.isCallExpression(module)) {
      const decl = getModuleDeclarationFromExpression(module);
      if (decl) {
        const declType = decl.getType();
        declType === routerType
          ? routerExpressions.push(module)
          : moduleDeclarations.push(decl);
      }
    }
  }

  return {
    routerExpressions,
    moduleExpressions: moduleDeclarations
  };
};

const findModuleDeclaration = (id: Identifier): ClassDeclaration => {
  // todo rewrite for universal method
  const type = id.getType();
  const symbol = type.getSymbol();
  const decls = symbol?.getDeclarations() || [];
  return decls
    .filter(decl => Node.isClassDeclaration(decl))
    .map(node => node as ClassDeclaration)?.[0];
};

const getModuleDeclarationFromExpression = (
  callExpr: CallExpression
): ClassDeclaration | null => {
  const expr = callExpr.getExpression();
  if (Node.isPropertyAccessExpression(expr)) {
    const name = expr.getName();
    if (name === 'forRoot' || 'forChild') {
      const moduleName = expr.getExpression();
      if (Node.isIdentifier(moduleName)) {
        return findModuleDeclaration(moduleName);
      }
    }
  }

  console.error(`Can't find module name in expression: ${callExpr.getText()}`);
  return null;
};

const getImportsFromModuleDeclaration = (
  project: Project,
  module: ClassDeclaration
): Node[] => {
  const decorator = module.getDecorator('NgModule');
  if (!decorator) {
    return [];
  }

  const arg = decorator.getArguments()?.[0];
  if (!arg) {
    return [];
  }

  return parseImports(arg, project)?.getElements() || [];
};

const parseImports = (
  importsArg: Node,
  project: Project
): ArrayLiteralExpression | null => {
  if (Node.isObjectLiteralExpression(importsArg)) {
    const imports = getPropertyValue(importsArg, 'imports');
    if (!imports) {
      return null;
    }

    if (Node.isIdentifier(imports)) {
      return tryFindIdentifierValue(imports, project);
    } else if (Node.isArrayLiteralExpression(imports)) {
      return imports;
    } // todo find other cases (imports: [...imports]
  }

  return null;
};

const readPath = (
  node: ObjectLiteralExpression,
  typeChecker: TypeChecker
): string => {
  const expression = getPropertyValue(node, 'path');
  if (expression) {
    const path = evaluateExpression(expression, typeChecker);
    return typeof path === 'string' ? path : '/';
  }

  return '/';
};

const readChildren = (
  node: ObjectLiteralExpression,
  routerType: Type,
  project: Project
): ParsedRoute[] => {
  const expression = getPropertyValue(node, 'children');
  if (expression && Node.isArrayLiteralExpression(expression)) {
    return parseRoutes(expression, routerType, project);
  }

  return [];
};

export const readLoadChildren = (
  node: ObjectLiteralExpression,
  typeChecker: TypeChecker
): LoadChildren | null => {
  const expression = getPropertyValue(node, 'loadChildren');
  if (!expression) {
    return null;
  }
  if (Node.isStringLiteral(expression)) {
    return getOldLoadChildrenSyntaxPath(expression.getText());
  }

  if (Node.isArrowFunction(expression)) {
    const body = expression.getBody();
    if (Node.isCallExpression(body)) {
      return parseLoadChildrenFunction(body);
    }
  }

  // loadChildren: 'foo' + '/' + 'bar'
  const path = evaluateExpression(node, typeChecker);
  return path ? getOldLoadChildrenSyntaxPath(path) : null;
};

const getOldLoadChildrenSyntaxPath = (str: string): LoadChildren | null => {
  const [path, module] = str.split('#')[1];
  if (typeof path === 'string' && module) {
    return { path, module };
  }

  return null;
};

const parseLoadChildrenFunction = (
  fnNode: CallExpression
): LoadChildren | null => {
  const parsedLoadChildren: Partial<LoadChildren> = {};
  const accessExpression = fnNode.getExpression();
  if (Node.isPropertyAccessExpression(accessExpression)) {
    const impExpr = accessExpression.getExpression();
    if (Node.isCallExpression(impExpr)) {
      const impArg = impExpr.getArguments()?.[0];
      if (Node.isStringLiteral(impArg)) {
        parsedLoadChildren.path = impArg.getLiteralText();
      }
    }
  }

  const args = fnNode.getArguments()?.[0];
  if (args && Node.isArrowFunction(args)) {
    const body = args.getBody();
    if (Node.isPropertyAccessExpression(body)) {
      parsedLoadChildren.module = body.getName();
    }
  }

  const { path, module } = parsedLoadChildren;
  if (typeof path === 'string' && module) {
    return { path, module };
  }

  return null;
};

const evaluateExpression = (
  node: Expression,
  morhpTypeChecker: TypeChecker
): string | null => {
  const compilerNode = node.compilerNode;
  const typeChecker = morhpTypeChecker.compilerObject;
  const result = evaluate({
    node: compilerNode,
    typeChecker
  });

  return result.success ? (result.value as string) : null;
};

const getPropertyValue = (
  node: ObjectLiteralExpression,
  property: string
): Expression | null => {
  for (const objectProperty of node.getProperties()) {
    if (Node.isPropertyAssignment(objectProperty)) {
      const name = objectProperty.getName();
      if (name === property) {
        return objectProperty.getInitializer() || null;
      }
    }
  }

  return null;
};

export const getAppModule = (
  project: Project,
  path: string
): ClassDeclaration => {
  const sourceFile = project.getSourceFileOrThrow(path);

  let bootstrapId: Identifier | undefined;

  function findBootstrapModule(node: Node): void {
    if (Node.isIdentifier(node) && node.getText() === 'bootstrapModule') {
      bootstrapId = node;
    } else {
      node.forEachChild(findBootstrapModule);
    }
  }
  sourceFile.forEachChild(findBootstrapModule);

  if (!bootstrapId) {
    throw new Error(`Can't find bootstrapModule expression in ${path}`);
  }

  const parent = bootstrapId?.getParentOrThrow();
  const callExpresion = parent.getParentOrThrow();
  if (Node.isCallExpression(callExpresion)) {
    const module = callExpresion.getArguments()?.[0];
    // todo when module is not class token
    const declaration = findClassDeclarationByIdentifier(module as Identifier);
    if (!declaration) {
      throw new Error(`Cant't find AppModule!`);
    }

    return declaration;
  }

  throw new Error(`Cant't find AppModule!`);
};

const findClassDeclarationByIdentifier = (
  id: Identifier
): ClassDeclaration | null => {
  const type = id.getType();
  const symbol = type.getSymbol();
  const decls = symbol?.getDeclarations() || [];
  const classDeclarations = decls.filter(node => Node.isClassDeclaration(node));

  if (classDeclarations.length) {
    return classDeclarations[0] as ClassDeclaration;
  }

  return null;
};
