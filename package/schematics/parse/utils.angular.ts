import { Tree } from '@angular-devkit/schematics';
import { WorkspaceSchema } from '@angular-devkit/core/src/experimental/workspace';
import * as ts from 'typescript';
import { resolve } from 'path';
import { FindMainModuleOptions } from './types';

const findAngularJSON = (tree: Tree): WorkspaceSchema => {
  const angularJson = tree.read('angular.json');
  if (!angularJson) {
    throw new Error("angular.json doesn't exist");
  }

  const content = angularJson.toString();
  return JSON.parse(content) as WorkspaceSchema;
};

const findMainFile = ({
  tree,
  program,
  project
}: FindMainModuleOptions): ts.SourceFile => {
  const angularJson = findAngularJSON(tree);
  const workspace = angularJson.projects[project];
  const relativeMainPath = workspace?.architect?.build?.options?.main || '';
  const absoluteMainPath = resolve(relativeMainPath);

  const mainFile = program
    .getSourceFiles()
    .find(sourceFile => sourceFile.fileName === absoluteMainPath);

  if (!mainFile) {
    throw new Error("Can't find main file");
  }

  return mainFile;
};

const tryFindMainModule = (
  node: ts.Node,
  program: ts.Program
): string | null => {
  if (ts.isIdentifier(node) && node.text === 'bootstrapModule') {
    const propAccess = node.parent;
    if (!propAccess || !ts.isPropertyAccessExpression(propAccess)) {
      return null;
    }

    const tempExpr = propAccess.parent;
    if (!tempExpr || !ts.isCallExpression(tempExpr)) {
      return null;
    }

    const module = tempExpr.arguments[0];
    const typeChecker = program.getTypeChecker();
    const symbol = typeChecker.getTypeAtLocation(module).getSymbol();
    if (!symbol) {
      return null;
    }

    const declarations = symbol.getDeclarations();
    if (!declarations) {
      return null;
    }

    return resolve(declarations[0].getSourceFile().fileName);
  }

  let mainPath: null | string = null;
  node.forEachChild(nextNode => {
    if (mainPath) {
      return mainPath;
    }
    mainPath = tryFindMainModule(nextNode, program);
  });

  return mainPath;
};

export const getRouterDefinitonFile = (program: ts.Program): ts.SourceFile => {
  const routerDefinitions = program
    .getSourceFiles()
    .filter(file => file.fileName.includes('angular/router'))
    .find(file => file.fileName.includes('router.d.ts'));

  if (routerDefinitions) {
    return routerDefinitions;
  } else {
    throw new Error("Angular router didn't find");
  }
};

// todo refactor
export const getRouterDeclarations = (program: ts.Program): ts.Identifier => {
  const routerDefinitions = getRouterDefinitonFile(program);

  let routerModule: null | ts.Identifier = null;
  routerDefinitions.forEachChild(node => {
    if (ts.isClassDeclaration(node) && node?.name?.text === 'RouterModule') {
      routerModule = node.name;
    }
  });

  if (!routerModule) {
    throw new Error("Router module doesn't exist");
  }

  const typeChecker = program.getTypeChecker();
  const symbol = typeChecker.getTypeAtLocation(routerModule).getSymbol();
  if (symbol) {
    const type = typeChecker.getDeclaredTypeOfSymbol(symbol);

    function isRouterModule(node: ts.Node): void {
      if (ts.isIdentifier(node)) {
        const nodeSybmol = typeChecker.getTypeAtLocation(node).getSymbol();
        if (nodeSybmol) {
          const nodeType = typeChecker.getDeclaredTypeOfSymbol(nodeSybmol);
          if (nodeType === type) {
            const parent = node.parent;
            if (parent && ts.isPropertyAccessExpression(parent)) {
              console.log(parent.name);
            }
          }
        }
      } else {
        node.forEachChild(isRouterModule);
      }
    }

    program.getSourceFiles().filter(node => {
      isRouterModule(node);
    });
  }

  return routerModule;
};

export const findAppModule = ({
  tree,
  program,
  project
}: FindMainModuleOptions): string => {
  const mainFile = findMainFile({ tree, program, project });

  // todo change
  getRouterDeclarations(program);

  const appModulePath = tryFindMainModule(mainFile, program);
  return appModulePath || '';
};
