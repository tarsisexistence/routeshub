import { Hub } from '../../../package';
import { Tree } from './tree';

export const hub = Hub.inject<Tree>();
