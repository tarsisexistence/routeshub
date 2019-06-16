import { take } from 'rxjs/operators';
import { getSlice, hub } from '../hub';

export function Sliced<T = any>(
  arg: string | symbol
): (target: any, propertyKey: PropertyKey) => T {
  return <R>(target: any, propertyKey: string | symbol) => {
    let sliceValue: R;

    hub.pipe(take(1)).subscribe(slices => {
      sliceValue = getSlice<R>(arg, slices);
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
