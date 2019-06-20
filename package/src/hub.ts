import { BehaviorSubject } from 'rxjs';

/**
 * stores routes states at the same level
 */
export const hub = new BehaviorSubject(null);
