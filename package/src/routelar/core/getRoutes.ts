export const getRoutes = <T>(): T => {
  const proxy = new Proxy(['/'], {
    get(target, path): string[] {
      if (path === Symbol.iterator) {
        return Array.prototype[Symbol.iterator].bind(target) as string[];
      } else {
        const next = [...target, path];
        return new Proxy(next, this) as string[];
      }
    }
  });

  return (proxy as unknown) as T;
};

export const proxyThatDoesntWork: string[] = new Proxy([] as string[], {
  get(target, path): any {
    if (path in target) {
      return target[path];
    } else {
      const next = [...target, path];
      return new Proxy(next, this);
    }
  }
});
