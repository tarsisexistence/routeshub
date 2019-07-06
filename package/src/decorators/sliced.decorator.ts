import { take } from 'rxjs/operators';
import { hub } from '../hub';
import { getSlice } from '../functions';
import { Slice } from '../interfaces';

export function Sliced<T = any>(
  arg: string | symbol
): (target: any, propertyKey: PropertyKey) => void {
  return <R>(target: any, propertyKey: string | symbol) => {
    let sliceValue: Slice<R>;

    hub.pipe(take(1)).subscribe(() => {
      sliceValue = getSlice<R>(arg);
    });

    Object.defineProperty(target, propertyKey, {
      get(): Slice<R> {
        return sliceValue || ({} as Slice<R>);
      },
      set(): void {}
    });
  };
}
