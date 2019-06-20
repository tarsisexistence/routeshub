import { Params } from '../interfaces';
import { insertLinkParams, reduceParams } from '../utils/state';

/**
 * Supports dynamic paths for array-like links
 * through route variables
 */
export function forwardParams(
  link: string[],
  params?: Params,
  ...otherParams: Params[]
): string[] {
  if (!params || typeof params !== 'object') {
    return link;
  }

  const parameters =
    otherParams.length === 0 ? params : reduceParams(params, otherParams);

  return insertLinkParams(link, parameters);
}
