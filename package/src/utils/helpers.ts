import { indexer } from './indexer';
import { recordNextHubValue } from './hub';

/*
 * util for internal usage
 */
export const resetPackage = (): void => {
  recordNextHubValue(null);
  indexer.next({ reset: true });
};

/**
 * checks attribute presence and activity
 */
export const checkAttrActivity = (attr: boolean): boolean => Boolean(attr);

/**
 * gets string | string[] and returns valid format in string []
 */
export const getClassNames = (input: string | string[]): string[] => {
  const classNames = input instanceof Array ? input : input.split(' ');
  return classNames.filter((className: string) => className.length > 0);
};

/**
 * hides a way to flush an error message
 */
export const showError = (...errorMessages: any[]): void => {
  console.error(...errorMessages);
};
