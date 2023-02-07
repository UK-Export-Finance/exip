import usingBroker from './using-broker';
import { ValidationErrors } from '../../../../../../../types';

const rules = [usingBroker] as Array<() => ValidationErrors>;

export default rules;
