import isUsingBrokerRules from './using-broker';
import { ValidationErrors } from '../../../../../../../types';

const rules = [isUsingBrokerRules] as Array<() => ValidationErrors>;

export default rules;
