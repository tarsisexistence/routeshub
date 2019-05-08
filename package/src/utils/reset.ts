import { hub } from '../hub';
import { indexer } from './indexer';

/*
 * util for internal usage
 */
export const reset = (): void => {
  hub.next(null);
  indexer.next({ reset: true });
};
