import { Rule, Tree } from '@angular-devkit/schematics';
import * as ts from 'typescript';
import { findAngularJSON, getProjectAST } from './utils.angular';
import { Options } from './types';
import { parseRoutes } from './parse-routes';
import { transform } from '../generation/transform';

export function parse(options: Options): Rule {
  return (tree: Tree) => {
    const { project } = options;
    if (!project) {
      throw new Error('Project name expected');
    }

    const angularJson = findAngularJSON(tree);
    const workspace = angularJson.projects[project];
    const projectAST = getProjectAST(workspace, project);

    const file = projectAST.createSourceFile('file.d.ts');
    file.compilerNode.statements = ts.createNodeArray([]);
    const parsedRoutes = parseRoutes(workspace, projectAST);
    console.log({ parsedRoutes });
    const transformedRoutes = transform(parsedRoutes);
    console.log({ transformedRoutes });

    return tree;
  };
}
