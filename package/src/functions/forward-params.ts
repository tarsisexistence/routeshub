import { Params } from '../interfaces';
import { insertLinkParams } from '../utils/state';

/**
 * Supports dynamic paths for array-like links
 * through route variables
 */
export function forwardParams(link: string[], params?: Params): string[] {
  if (!params || typeof params !== 'object') {
    return link;
  }

  return insertLinkParams(link, params);
}
