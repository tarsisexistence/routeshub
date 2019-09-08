/**
 * generator that keeps and generates unique identifiers
 */
function* makeResettableIterator(): IterableIterator<number> {
  let index = 0;
  while (true) {
    const options = yield index++;

    if (!options) {
      continue;
    }
    index = options.reset ? -1 : index;
  }
}

/**
 * provides ordered ids
 */
export const indexer = makeResettableIterator();
