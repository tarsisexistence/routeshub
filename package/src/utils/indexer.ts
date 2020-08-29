/**
 * generator that keeps and generates unique identifiers
 */
function* makeResettableIterator(): Generator<number> {
  let index = 0;

  while (true) {
    const options: { reset?: boolean } = yield index++;

    if (options) {
      index = options.reset ? -1 : index;
    }
  }
}

/**
 * provides ordered ids
 */
export const indexer = makeResettableIterator();
