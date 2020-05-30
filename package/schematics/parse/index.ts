import { Rule, Tree } from '@angular-devkit/schematics';
import { getProgram } from './utils.system';
import { Options } from './types';
import { findAppModule } from './utils.angular';

export function parse(options: Options): Rule {
  return (tree: Tree) => {
    const { project } = options;
    if (!project) {
      throw new Error('Project name expected');
    }

    const config = tree.get('./tsconfig.json');
    if (!config) {
      throw new Error("tsconfig didn't find");
    }

    const content = config.content.toString();
    const program = getProgram(JSON.parse(content));
    const appModule = findAppModule({ tree, program, project });
    console.log(appModule);

    return tree;
  };
}
