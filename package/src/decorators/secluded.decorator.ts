import { takeWhile } from 'rxjs/operators';
import { hub } from '../hub';
import { getUnit } from '../functions';
import { Unit } from '../interfaces';
import { privateNotesKey } from '../interfaces/common.interfaces';

/**
 * decorator which provides possibility
 * to get units inside component
 */
export function Secluded<T = any>(
  arg: privateNotesKey
): (target: any, propertyKey: PropertyKey) => void {
  return <R>(target: any, propertyKey: privateNotesKey) => {
    let unitValue: Unit<R>;

    hub.pipe(takeWhile(_ => !Boolean(unitValue))).subscribe((): void => {
      unitValue = getUnit<R>(arg);
    });

    Object.defineProperty(target, propertyKey, {
      get(): Unit<R> {
        return unitValue || ({} as Unit<R>);
      },
      set(): void {}
    });
  };
}
