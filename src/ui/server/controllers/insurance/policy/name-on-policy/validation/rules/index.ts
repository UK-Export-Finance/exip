import positionRule from './position';
import nameOnPolicyRule from './name-on-policy';
import { ValidationErrors } from '../../../../../../../types';

const rules = [nameOnPolicyRule, positionRule];

const validationRules = rules as Array<() => ValidationErrors>;

export default validationRules;
