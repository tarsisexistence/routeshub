import { Rule, Tree } from '@angular-devkit/schematics';
import { getProgram } from './utils.system';
import { Options } from './types';
import { findAngularJSON, findAppModule } from './utils.angular';

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

    const config = tree.get(configPath as string);
    console.log('Config: ', config);
    if (!config) {
      throw new Error("tsconfig didn't find");
    }

    const content = config.content.toString();
    const program = getProgram(JSON.parse(content), configPath as string);
    const appModule = findAppModule({ tree, program, project });
    console.log(appModule);

    return tree;
  };
}
