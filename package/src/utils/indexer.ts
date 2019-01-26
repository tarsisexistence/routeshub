/**
 * Utility function to generate unique id
 */
export const indexer = () => indexer.count++ || 0;
indexer.count = 0;
