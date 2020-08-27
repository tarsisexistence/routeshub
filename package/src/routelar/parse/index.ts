import { Rule, Tree } from '@angular-devkit/schematics';

import { findAngularJSON, getProjectAST } from './utils.angular';
import { parseRoutes } from './parse-routes';
import { generate } from '../generation/generate';

export function parse(options: Routelar.Parse.Options): Rule {
  return (tree: Tree) => {
    const { project } = options;

    if (!project) {
      throw new Error('Project name expected');
    }

    const angularJson = findAngularJSON(tree);
    const workspace = angularJson.projects[project];
    const projectAST = getProjectAST(workspace, project);
    const parsedRoutes = parseRoutes(workspace, projectAST);

    generate(projectAST, parsedRoutes);

    return tree;
  };
}
