import { hub } from '../hubs';
import { indexer } from './indexer';

/*
 * util for internal usage
 */
export const reset = (): void => {
  hub.next(null);
  indexer.next({ reset: true });
};
