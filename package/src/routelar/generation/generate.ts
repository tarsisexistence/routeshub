import { Project } from 'ts-morph';

import { transform } from './transform';
import { createRoutesType } from './createType';

export const generate = (
  project: Project,
  parsedRoutes: Routelar.Generation.TransformRoutes
): void => {
  const transformedRoutes = transform(parsedRoutes);
  console.log({ transformedRoutes });

  const file = project.createSourceFile('filename.d.ts');

  file.compilerNode.statements = createRoutesType(parsedRoutes);

  project.saveSync();

  console.log(file.compilerNode.statements);
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
