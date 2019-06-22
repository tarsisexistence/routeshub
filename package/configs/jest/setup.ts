import 'jest-preset-angular';
import './global-mocks';

import { reset } from '../../src/utils/reset';

afterEach(reset);
