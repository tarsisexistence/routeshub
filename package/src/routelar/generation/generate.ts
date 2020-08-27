import { Project } from 'ts-morph';
import * as ts from 'typescript';

import { transform } from './transform';
import { createTypeTree } from './createTypeTree';

export const generate = (
  project: Project,
  parsedRoutes: Routelar.Generation.TransformRoutes
): void => {
  const transformedRoutes = transform(parsedRoutes);
  const filename = 'routelar.d.ts';
  const resultFile = ts.createSourceFile(filename, '', ts.ScriptTarget.Latest);
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  const result = printer.printNode(
    ts.EmitHint.Unspecified,
    createTypeTree(transformedRoutes),
    resultFile
  );

  console.log(result);

  project.createSourceFile(filename, result, { overwrite: true }).saveSync();
};

/**
 {
    root: ['/'],
    home: ['/', 'home'],
    about: ['/', 'about'],
    car: ['/', 'car'],
    details: ['/', 'details'],
    info: ['/', 'info'],

    engine: {
    ':year': ['/', 'engine', 'string']
    },

    users: {
      root: ['/', 'users'],
        ':id': {
        root: ['/', 'users', 'string'],
          profile: ['/', 'users', 'string', 'profile']
        }
    }
  }
 */
