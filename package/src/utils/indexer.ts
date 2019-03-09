/**
 * generator that keeps and generates unique identifiers
 */
function* idfy(): IterableIterator<number> {
  let index = 0;
  while (true) {
    const options = yield index++;

    if (!options) {
      continue;
    }

    index = options.reset ? 0 : index;
  }
}

/**
 * Gives ordered ids
 */
export const indexer = idfy();
