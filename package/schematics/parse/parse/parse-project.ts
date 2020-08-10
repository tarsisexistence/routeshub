import { RouteTree } from './types';
import { WorkspaceSchema } from '@angular-devkit/core/src/experimental/workspace';
import { resolve } from 'path';
import { Project } from 'ts-morph';
import {
  createProjectRouteTree,
  getAppModule,
  getRouteModuleForRootExpressions
} from './utils';
import { getRouterModuleClass } from './utils.angular';

export const parseProject = (
  angularJSON: WorkspaceSchema,
  projectName: string
): RouteTree => {
  const workspace = angularJSON.projects[projectName];
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
  const project = new Project({
    tsConfigFilePath: absoluteConfigPath,
    addFilesFromTsConfig: true
  });

  const pathToMainFile = workspace.architect?.build?.options?.main as string;
  if (!pathToMainFile) {
    throw new Error("Can't find path to main.ts in angular.json");
  }

  const appModule = getAppModule(project, pathToMainFile);

  // todo rewrite this part
  const routerModuleClass = getRouterModuleClass(project);
  const routerType = routerModuleClass.getType();

  const expression = getRouteModuleForRootExpressions(routerModuleClass);

  if (expression) {
    return createProjectRouteTree(project, appModule, expression, routerType);
  } else {
    throw new Error("RouterModule.forRoot expression did't find");
  }
};
