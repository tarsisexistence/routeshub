import { Tree } from '@angular-devkit/schematics';
import * as ts from 'typescript';

export type RouterExpression = 'forRoot' | 'forChild';

export interface NodeWithFileName<T extends ts.Node> {
  node: T;
  fileName: string;
}

export interface Options {
  project: string;
}

export interface FindMainModuleOptions {
  tree: Tree;
  program: ts.Program;
  project: string;
}
