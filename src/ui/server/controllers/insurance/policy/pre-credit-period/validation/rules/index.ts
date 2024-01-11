import positionRule from './pre-credit-period-description';
import nameOnPolicyRule from './pre-credit-period';
import { ValidationErrors } from '../../../../../../../types';

const rules = [nameOnPolicyRule, positionRule];

const validationRules = rules as Array<() => ValidationErrors>;

export default validationRules;
