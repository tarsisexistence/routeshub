import { Tree } from '@angular-devkit/schematics';
import { WorkspaceSchema } from '@angular-devkit/core/src/experimental/workspace';
import * as ts from 'typescript';
import { resolve } from 'path';

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
}: {
  tree: Tree;
  program: ts.Program;
  project: string;
}): ts.SourceFile => {
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

export const findAppModule = ({
  tree,
  program,
  project
}: {
  tree: Tree;
  program: ts.Program;
  project: string;
}): string => {
  const mainFile = findMainFile({ tree, program, project });

  const tryFindMainModule = (node: ts.Node) => {
    if (
      ts.isIdentifier(node) &&
      (node as ts.Identifier).text === 'bootstrapModule'
    ) {
      const propAccess = (node as ts.Identifier).parent;
      if (!propAccess || !ts.isPropertyAccessExpression(propAccess)) {
        return null;
      }
      const tempExpr = propAccess.parent;
      if (!tempExpr || !ts.isCallExpression(tempExpr)) {
        return null;
      }
      const expr = tempExpr as ts.CallExpression;
      const module = expr.arguments[0];
      const tc = program.getTypeChecker();
      const symbol = tc.getTypeAtLocation(module).getSymbol();
      if (!symbol) {
        return null;
      }
      const decl = symbol.getDeclarations();
      if (!decl) {
        return null;
      }
      return resolve(decl[0].getSourceFile().fileName);
    }
    let mainPath: null | string = null;
    node.forEachChild(c => {
      if (mainPath) {
        return mainPath;
      }
      mainPath = tryFindMainModule(c);
    });
    return mainPath;
  };

  const appModulePath = tryFindMainModule(mainFile);
  return appModulePath || '';
};
