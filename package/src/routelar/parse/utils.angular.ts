import { Tree } from '@angular-devkit/schematics';
import {
  WorkspaceProject,
  WorkspaceSchema
} from '@angular-devkit/core/src/experimental/workspace';
import { ClassDeclaration, Node, Project } from 'ts-morph';
import { resolve } from 'path';

export const findAngularJSON = (tree: Tree): WorkspaceSchema => {
  const angularJson = tree.read('angular.json');
  if (!angularJson) {
    throw new Error("angular.json doesn't exist");
  }

  const content = angularJson.toString();
  return JSON.parse(content) as WorkspaceSchema;
};

export const getProjectAST = (
  workspace: WorkspaceProject,
  projectName: string
): Project => {
  const tsConfigs: string | string[] =
    workspace.architect?.build?.options?.tsConfig;
  let configPath: string | undefined;
  if (Array.isArray(tsConfigs)) {
    configPath = tsConfigs?.find(
      conf =>
        conf.includes('tsconfig.lib') ||
        conf.includes('tsconfig.json') ||
        conf.includes('tsconfig.app.json')
    );
  } else if (typeof tsConfigs === 'string') {
    configPath = tsConfigs;
  } else {
    throw new Error(
      `The config is not specified in angular.json for ${projectName} project`
    );
  }

  const absoluteConfigPath = resolve(process.cwd(), configPath as string);
  return new Project({
    tsConfigFilePath: absoluteConfigPath,
    addFilesFromTsConfig: true
  });
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
