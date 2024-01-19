import descriptionRule from './credit-period-with-buyer-description';
import nameOnPolicyRule from './pre-credit-period';
import { ValidationErrors } from '../../../../../../../types';

const rules = [nameOnPolicyRule, descriptionRule];

const validationRules = rules as Array<() => ValidationErrors>;

export default validationRules;
