import policyTypeRules from './policy-type';
import policyLengthRules from './policy-length';
import { ValidationErrors } from '../../../../../../types';

const rules = [policyTypeRules, policyLengthRules] as Array<() => ValidationErrors>;

export default rules;
