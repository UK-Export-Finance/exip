import nameOnPolicyRule from './another-company';
import { ValidationErrors } from '../../../../../../../types';

const rules = [nameOnPolicyRule];

const validationRules = rules as Array<() => ValidationErrors>;

export default validationRules;
