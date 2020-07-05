import { Rule, Tree } from '@angular-devkit/schematics';
import {
  findAngularJSON,
  getRouteModuleExpressions,
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
    console.log('start project create', absoluteConfigPath);
    const projectInstance = new Project({
      tsConfigFilePath: absoluteConfigPath,
      addFilesFromTsConfig: true
    });

    const exporession = getRouteModuleExpressions(projectInstance);
    if (exporession) {
      const parsedRoutes = parseRoutes(
        exporession,
        projectInstance.getTypeChecker()
      );
      if (parsedRoutes) {
        parsedRoutes.forEach(showRoutes.bind(null, 0));
      }
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
