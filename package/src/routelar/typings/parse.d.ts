declare namespace Routelar.Parse {
  interface Options {
    project: string;
  }

  type RouterExpression = 'forRoot' | 'forChild';

  interface LoadChildren {
    path: string;
    moduleName: string;
  }

  type RouteTree = Record<string, any>;
}
