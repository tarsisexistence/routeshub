import 'jest-preset-angular/setup-jest';
import './global-mocks';

import { resetPackage } from '../../src/utils/helpers';

afterEach(resetPackage);
