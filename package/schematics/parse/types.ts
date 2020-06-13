import * as ts from 'typescript';

export type RouterExpression = 'forRoot' | 'forChild';

export interface NodeWithFile<T extends ts.Node> {
  node: T;
  file: ts.SourceFile;
}

export interface Options {
  project: string;
}

export interface LoadChildren {
  childPath: string;
  moduleName: string;
}
