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
  PropertyAccessExpression, SourceFile,
  ts,
  Type,
  TypeChecker
} from 'ts-morph';
import { LoadChildren, RouterExpression, RouteTree } from './types';
import { evaluate } from '@wessberg/ts-evaluator';
import { resolve, sep  } from 'path';

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
  routerModuleClass: ClassDeclaration
) => ArrayLiteralExpression | null = (
  routerModuleClass: ClassDeclaration
): ArrayLiteralExpression | null => {
  const refs = routerModuleClass.findReferencesAsNodes();

  // todo add check for Router.RouterModule.for....
  const forRootExpressions = getRouterModuleCallExpressions(refs, 'forRoot');
  if (forRootExpressions.length > 1) {
    throw new Error('You have more than one RouterModule.forRoot expression');
  }

  const forRootExpression = forRootExpressions[0];
  return findRouterModuleArgumentValue(forRootExpression);
};

const findRouterModuleArgumentValue = (
  routerExpr: CallExpression
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
    return tryFindIdentifierValue(firstArg);
  }
  // todo for spread forRoot(...array)
  return null;
};

const tryFindIdentifierValue = (
  id: Identifier
): ArrayLiteralExpression | null => {
  const defs = id.getDefinitionNodes();

  for (const def of defs) {
    // expression.expression1.varName
    if (def && Node.isVariableDeclaration(def)) {
      const initializer = def.getInitializer();
      if (initializer && Node.isArrayLiteralExpression(initializer)) {
        return initializer;
      }
    }
  }

  return null;
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
): RouteTree => {
  let root: RouteTree = {};
  const elements = routes.getElements();

  for (const el of elements) {
    if (Node.isObjectLiteralExpression(el)) {
      const parsedRoute = parseRoute(el, routerType, project);
      root = { ...root, ...parsedRoute };
    } // todo cases with variables like const routes = [ varRoute1, varRoute2 ]
  }

  return root;
};

const parseRoute = (
  route: ObjectLiteralExpression,
  routerType: Type<ts.Type>,
  project: Project
): RouteTree | null => {
  let root: RouteTree = {};
  const typeChecker = project.getTypeChecker();
  const path = readPath(route, typeChecker);
  const routeName = path === '' ? 'root' : path;
  root[routeName] = {};

  const sourceFile = route.getSourceFile();
  const loadChildren =
    readLoadChildrenWithFullModulePath(route, sourceFile, typeChecker);
  if (loadChildren) {
    const lazyModule = getLazyModuleDelcaration(project, loadChildren);
    const lazyModuleRouteTree = createModuleRouteTree(
      project,
      lazyModule,
      routerType
    );
    root = { ...root, ...lazyModuleRouteTree };
  }

  root[routeName] = readChildren(route, routerType, project);

  return root;
};

const getLazyModuleDelcaration = (
  project: Project,
  loadChildren: LoadChildren
): ClassDeclaration => {
  const { path, moduleName } = loadChildren;
  const pathWithExtension = `${path}.ts`;
  const sourceFile = project.getSourceFileOrThrow(pathWithExtension);
  return sourceFile.getClassOrThrow(moduleName);
};

export const createProjectRouteTree = (
  project: Project,
  appModule: ClassDeclaration,
  forRootExpr: ArrayLiteralExpression,
  routerType: Type
): RouteTree => {
  let root: RouteTree = {};
  const eagersTree = createModuleRouteTree(project, appModule, routerType);
  root = { ...root, ...eagersTree };

  const parsedRoot = parseRoutes(forRootExpr, routerType, project);
  return { ...root, ...parsedRoot };
};

const createModuleRouteTree = (
  project: Project,
  module: ClassDeclaration,
  routerType: Type
): RouteTree => {
  let root: RouteTree = {};

  const eagerForChildExpr = findRouteChildren(routerType, module);
  for (const forChildExpr of eagerForChildExpr) {
    const routes = findRouterModuleArgumentValue(forChildExpr);
    if (routes) {
      const parsed = parseRoutes(routes, routerType, project);
      root = { ...root, ...parsed };
    }
  }

  return root;
};

/**
 * Get Module Declaration, parse imports, find route modules
 * and parse them
 */
export const findRouteChildren = (
  routerType: Type,
  module: ClassDeclaration
) => {
  const routerModules: CallExpression[] = [];
  const modules = [module];

  while (modules.length) {
    const currentModule = modules.shift() as ClassDeclaration;
    const imports = getImportsFromModuleDeclaration(currentModule);
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

const getImportsFromModuleDeclaration = (module: ClassDeclaration): Node[] => {
  const decorator = module.getDecorator('NgModule');
  if (!decorator) {
    return [];
  }

  const arg = decorator.getArguments()?.[0];
  if (!arg) {
    return [];
  }

  return parseImports(arg)?.getElements() || [];
};

const parseImports = (importsArg: Node): ArrayLiteralExpression | null => {
  if (Node.isObjectLiteralExpression(importsArg)) {
    const imports = getPropertyValue(importsArg, 'imports');
    if (!imports) {
      return null;
    }

    if (Node.isIdentifier(imports)) {
      return tryFindIdentifierValue(imports);
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
): RouteTree => {
  let root: RouteTree = {};
  const expression = getPropertyValue(node, 'children');
  if (expression && Node.isArrayLiteralExpression(expression)) {
    const routes = parseRoutes(expression, routerType, project);
    root = { ...root, ...routes };
  } // todo case, where children is a variable

  return root;
};

export const readLoadChildrenWithFullModulePath = (
  node: ObjectLiteralExpression,
  currentSourceFile: SourceFile,
  typeChecker: TypeChecker
): LoadChildren | null => {
  const loadChildren = readLoadChildren(node, typeChecker);
  if (!loadChildren) {
    return null;
  }

  const { path } = loadChildren;
  if (!path.startsWith(`.${sep}`)) {
    return loadChildren;
  }

  const currentFilePath = currentSourceFile.getFilePath();
  const reducedPath = currentFilePath.split(sep);
  const currentDir = reducedPath.slice(0, reducedPath.length - 1).join(sep);
  const fullPathToLazyModule = resolve(currentDir, path);
  return { ...loadChildren, path: fullPathToLazyModule };
};

const readLoadChildren = (
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
    return { path, moduleName: module };
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
      parsedLoadChildren.moduleName = body.getName();
    }
  }

  const { path, moduleName } = parsedLoadChildren;
  if (typeof path === 'string' && moduleName) {
    return { path, moduleName };
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
