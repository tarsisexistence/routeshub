export const proxy: any = new Proxy([], {
  get(target, path): any {
    if (path === Symbol.iterator) {
      return Array.prototype[Symbol.iterator].bind(target);
    } else {
      const next = [...target, path];
      return new Proxy(next, this);
    }
  }
});

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
