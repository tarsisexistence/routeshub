import { Rule, Tree } from '@angular-devkit/schematics';
import { findAngularJSON, getProjectAST } from './parse/utils.angular';
import { Options } from './parse/types';
import { parseRoutes } from './parse/parse-routes';

export function parse(options: Options): Rule {
  return (tree: Tree) => {
    const { project } = options;
    if (!project) {
      throw new Error('Project name expected');
    }

    const angularJson = findAngularJSON(tree);
    const workspace = angularJson.projects[project];
    const projectAST = getProjectAST(workspace, project);
    const routeTree = parseRoutes(workspace, projectAST);
    console.log(routeTree);

    return tree;
  };
}
