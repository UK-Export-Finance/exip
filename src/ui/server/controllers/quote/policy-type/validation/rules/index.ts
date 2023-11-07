import policyTypeRules from './policy-type';
import { ValidationErrors } from '../../../../../../types';

const rules = [policyTypeRules] as Array<() => ValidationErrors>;

export default rules;
