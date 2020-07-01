import { Tree } from '@angular-devkit/schematics';
import { WorkspaceSchema } from '@angular-devkit/core/src/experimental/workspace';
import {
  CallExpression,
  ClassDeclaration,
  Node,
  Project,
  PropertyAccessExpression
} from 'ts-morph';
import { RouterExpression } from './types';

export const findAngularJSON = (tree: Tree): WorkspaceSchema => {
  const angularJson = tree.read('angular.json');
  if (!angularJson) {
    throw new Error("angular.json doesn't exist");
  }

  const content = angularJson.toString();
  return JSON.parse(content) as WorkspaceSchema;
};

export const getRouterModuleClass = (
  project: Project
): ClassDeclaration => {
  const moduleImport = project.getSourceFiles()
    .map(file => file.getImportDeclaration('@angular/router'))
    .filter(imp => !!imp)?.[0];

  if (!moduleImport) {
    throw new Error('RouterModule import didn\'t find');
  }

  const routerDefinitionFile =
    moduleImport.getModuleSpecifierSourceFileOrThrow();
  const routerModule = routerDefinitionFile.getClass('RouterModule');
  if (!routerModule) {
    throw new
    Error(`Can't find RouterModule in ${routerDefinitionFile.getFilePath()}`);
  }

  return routerModule;
};

export const getRouteModuleExpressions:
  (project: Project) => CallExpression[] =
  (project: Project): CallExpression[] => {
  const routerModuleClass = getRouterModuleClass(project);
  const refs = routerModuleClass.findReferencesAsNodes();

  // todo add check for Router.RouterModule.for....
  return getRouterModuleCallExpressions(refs, 'forRoot');
};

export const getRouterModuleCallExpressions:
  (routeModules: Node[], expression: RouterExpression) => CallExpression[] =
  (routeModules: Node[], expression: RouterExpression): CallExpression[] => {
    return routeModules.map(ref => ref.getParent() as PropertyAccessExpression)
      .filter(node => Node.isPropertyAccessExpression(node))
      .filter(node => {
        if (Node.hasName(node)) {
          return node.getName()  === expression;
        }

        return false;
      })
      .map(node => node.getParent() as CallExpression)
      .filter(node => Node.isCallExpression(node));
}
