import { Rule, Tree } from '@angular-devkit/schematics';
import { findAngularJSON, getRouterModuleClass } from './parse/utils.angular';
import { Project } from 'ts-morph';
import { Options } from './parse/types';
import { resolve } from 'path';
import {
  createProjectRouteTree,
  getAppModule,
  getRouteModuleForRootExpressions
} from './parse/utils';

export function parse(options: Options): Rule {
  return (tree: Tree) => {
    const { project } = options;
    if (!project) {
      throw new Error('Project name expected');
    }

    const angularJson = findAngularJSON(tree);
    const workspace = angularJson.projects[project];
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
        `The config is not specified in angular.json for ${project} project`
      );
    }

    const absoluteConfigPath = resolve(process.cwd(), configPath as string);
    const projectInstance = new Project({
      tsConfigFilePath: absoluteConfigPath,
      addFilesFromTsConfig: true
    });

    const pathToMainFile = workspace.architect?.build?.options?.main as string;
    if (!pathToMainFile) {
      throw new Error("Can't find path to main.ts in angular.json");
    }

    const appModule = getAppModule(projectInstance, pathToMainFile);

    // todo rewrite this part
    const routerModuleClass = getRouterModuleClass(projectInstance);
    const routerType = routerModuleClass.getType();

    const expression = getRouteModuleForRootExpressions(routerModuleClass);

    if (expression) {
      const routeTree = createProjectRouteTree(
        projectInstance,
        appModule,
        expression,
        routerType
      );
      console.log(routeTree);
    } else {
      throw new Error("RouterModule.forRoot expression did't find");
    }

    return tree;
  };
}
