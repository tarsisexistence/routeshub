import { Rule, Tree } from '@angular-devkit/schematics';
import { findAngularJSON } from './parse/utils.angular';
import { Options } from './parse/types';
import { parseProject } from './parse/parse-project';

export function parse(options: Options): Rule {
  return (tree: Tree) => {
    const { project } = options;
    if (!project) {
      throw new Error('Project name expected');
    }

    const angularJson = findAngularJSON(tree);
    const routeTree = parseProject(angularJson, project);
    console.log(routeTree);

    return tree;
  };
}
