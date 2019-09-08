import { take } from 'rxjs/operators';
import { hub } from '../hub';
import { getSlice } from '../functions';
import { Slice } from '../interfaces';
import { privateNotesKey } from '../interfaces/common.interfaces';

/**
 * decorator which provides possibility
 * to get slices inside component
 */
// tslint:disable:variable-name
export const Sliced = <T = any>(
  arg: privateNotesKey
): ((target: any, propertyKey: PropertyKey) => void) => <R>(
  target: any,
  propertyKey: privateNotesKey
) => {
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
