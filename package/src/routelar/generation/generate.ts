import { Project } from 'ts-morph';
import * as ts from 'typescript';

import { transform } from './transform';
import { createRoutesType } from './createType';

export const generate = (
  project: Project,
  parsedRoutes: Routelar.Generation.TransformRoutes
): void => {
  const transformedRoutes = transform(parsedRoutes);
  console.log({ transformedRoutes, project });

  const resultFile = ts.createSourceFile(
    'variable.ts',
    '',
    ts.ScriptTarget.Latest,
    /*setParentNodes*/ false,
    ts.ScriptKind.TS
  );
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

  const result = printer.printNode(
    ts.EmitHint.Unspecified,
    createRoutesType(transformedRoutes),
    resultFile
  );
  console.log(result);

  const sourceFile = project.createSourceFile('routelar.d.ts', result, {
    overwrite: true
  });

  sourceFile.saveSync();
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
