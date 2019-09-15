import { finalize, find } from 'rxjs/operators';
import { Unit, Units } from '../interfaces';
import { hub } from '../hub';
import { PRIVATE_NOTES_KEY } from '../constants';
import { partialFeatureRoutes } from '../interfaces/unit.interfaces';
import { privateNotesKey } from '../interfaces/common.interfaces';

/**
 * returns unit by key
 * from the second units arg
 */
const findUnit = (parentKey: privateNotesKey, units: Units): Unit | null =>
  Object.values(units || {}).find(
    (unit: Unit) => unit[PRIVATE_NOTES_KEY] === parentKey
  );

/**
 * connects feature units
 * to parent unit
 * which route paths are described
 * directly in the parent routes
 */
export function connectFeatures<R = any, C = {}>(
  key: privateNotesKey,
  features: partialFeatureRoutes<R, C>
): void {
  hub
    .asObservable()
    .pipe(
      find((units: Units) => Boolean(findUnit(key, units))),
      finalize(() => {
        const unit: Unit = findUnit(key, hub.value);

        for (const route of Object.keys(features)) {
          const feature = features[route];
          const featureParent = unit[route];
          feature(featureParent);
        }
      })
    )
    .subscribe();
}
