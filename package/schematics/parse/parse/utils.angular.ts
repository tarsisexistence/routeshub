import { Tree } from '@angular-devkit/schematics';
import { WorkspaceSchema } from '@angular-devkit/core/src/experimental/workspace';
import { ClassDeclaration, Node, Project } from 'ts-morph';

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

  const routerModuleSpec = moduleImport
    .getNamedImports()
    .filter(imp => imp.getName() === 'RouterModule')?.[0];
  if (routerModuleSpec) {
    const id = routerModuleSpec.getNameNode();
    const def = id.getDefinitionNodes()?.[0];
    if (Node.isClassDeclaration(def)) {
      return def;
    }
  }

  const routeDef = moduleImport.getModuleSpecifierSourceFileOrThrow();
  const routerModule = routeDef.getClass('RouterModule');
  if (!routerModule) {
    throw new Error(`Can't find RouterModule in ${routeDef.getFilePath()}`);
  }

  return routerModule;
};
