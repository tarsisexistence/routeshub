import 'reflect-metadata';
import { take } from 'rxjs/operators';
import { PRIVATE_HUB_KEY } from '../constants';
import { hub } from '../hub';

export function slice<T = any>(
  arg: string | symbol | string[] | symbol[]
): (target: any, propertyKey: PropertyKey) => T {
  return <R>(target: any, propertyKey: string | symbol) => {
    let sliceValue: R;

    hub.pipe(take(1)).subscribe(routes => {
      sliceValue =
        typeof arg === 'string'
          ? routes[arg]
          : (Object.values(routes || {}).find(
              (value: R) => value[PRIVATE_HUB_KEY] === arg
            ) as R);
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
