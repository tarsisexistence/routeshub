export interface Options {
  project: string;
}

export type RouterExpression = 'forRoot' | 'forChild';

export interface LoadChildren {
  path: string;
  moduleName: string;
}

export type RouteTree = Record<string, any>;
