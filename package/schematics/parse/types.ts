import { Tree } from '@angular-devkit/schematics';
import * as ts from 'typescript';

export interface Options {
  project: string;
}

export interface FindMainModuleOptions {
  tree: Tree;
  program: ts.Program;
  project: string;
}
