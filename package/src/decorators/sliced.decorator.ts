import { take } from 'rxjs/operators';
import { hub } from '../hub';
import { getSlice } from '../functions';

export function Sliced<T = any>(
  arg: string | symbol
): (target: any, propertyKey: PropertyKey) => T {
  return <R>(target: any, propertyKey: string | symbol) => {
    let sliceValue: R;

    hub.pipe(take(1)).subscribe(() => {
      sliceValue = getSlice<R>(arg);
    });

    Object.defineProperty(target, propertyKey, {
      get(): R {
        return sliceValue || ({} as R);
      },
      set(): void {}
    });

    return {} as T;
  };
}
