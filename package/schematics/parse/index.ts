import { Rule, Tree } from '@angular-devkit/schematics';
import {
  findAngularJSON,
  findRouteChildren,
  getAppModule,
  getRouteModuleForRootExpressions,
  getRouterModuleClass,
  parseRoutes
} from './utils.angular';
import { Project } from 'ts-morph';
import { Options, ParsedRoute } from './types';
import { resolve } from 'path';

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
    const childrens = findRouteChildren(projectInstance, routerType, appModule);
    console.log(childrens.map(ch => ch.getText()));

    const expression = getRouteModuleForRootExpressions(
      projectInstance,
      routerModuleClass
    );

    if (expression) {
      const parsedRoutes = parseRoutes(expression, routerType, projectInstance);
      if (parsedRoutes) {
        parsedRoutes.forEach(showRoutes.bind(null, 0));
      }
    } else {
      throw new Error("RouterModule.forRoot expression did't find");
    }

    return tree;
  };
}

function showRoutes(indent: number, route: ParsedRoute): void {
  const indentAsString = ' '.repeat(indent);
  console.log(`${indentAsString}path: ${route.path}`);

  if (route.loadChildren) {
    const { path, module } = route.loadChildren;
    console.log(`loadChildren: ${path}#${module}`);
  }

  if (route.children.length) {
    console.log(`${indentAsString}children: `);
    route.children.forEach(showRoutes.bind(null, indent + 1));
  }
}
