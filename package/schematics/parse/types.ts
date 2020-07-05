export interface Options {
  project: string;
}

export type RouterExpression = 'forRoot' | 'forChild';

export interface ParsedRoute {
  path: string;
  children: ParsedRoute[];
}
