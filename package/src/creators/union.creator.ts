import { hub } from '../hub';

export const createUnion = <T>(slices: T): T =>
  Object.keys(slices).reduce(
    (acc: T, name: string) => {
      const hasValue = Boolean(hub.value[name]);

      if (!hasValue) {
        console.error(`ERROR: property ${name} is doesn't exist in the hub.
      Please check existing keys in HUB to avoid mistakes in the future.`);
      }

      return hasValue
        ? { ...acc, [name]: hub.value[name] }
        : { ...acc, [name]: slices[name] };
    },
    {} as T
  );
