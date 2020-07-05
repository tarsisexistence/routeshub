export interface Options {
  project: string;
}

export type RouterExpression = 'forRoot' | 'forChild';

export type LoadChildren = string;

export interface ParsedRoute {
  path: string;
  children: ParsedRoute[];
  loadChildren: LoadChildren | null;
}
