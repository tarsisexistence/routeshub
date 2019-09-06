import 'jest-preset-angular';
import './global-mocks';

import { resetPackage } from '../../src/utils/helpers';

afterEach(resetPackage);
