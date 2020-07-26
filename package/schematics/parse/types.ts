export interface Options {
  project: string;
}

export type RouterExpression = 'forRoot' | 'forChild';

export interface LoadChildren {
  path: string;
  module: string;
}

export interface ParsedRoute {
  path: string;
  children: ParsedRoute[];
  loadChildren: LoadChildren | null;
}

export type RouteTree = Record<string, any>;
