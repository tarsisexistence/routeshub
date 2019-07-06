import { hub } from '../hub';
import { indexer } from './indexer';

/*
 * util for internal usage
 */
export const reset = (): void => {
  hub.next(null);
  indexer.next({ reset: true });
};

/**
 * checks attribute presence and activity
 */
export function checkAttrActivity(attr): boolean {
  return attr === '' || !!attr;
}

/**
 * gets string | string[] and returns valid format in string []
 */
export const getClassNames = (input: string | string[]): string[] => {
  const classNames = input instanceof Array ? input : input.split(' ');
  return classNames.filter((className: string) => className.length > 0);
};
