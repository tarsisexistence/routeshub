import { BehaviorSubject } from 'rxjs';
import { Units } from './interfaces/unit.interfaces';

/**
 * stores routes states at the same level
 */
export const hub = new BehaviorSubject<Units>(null);
