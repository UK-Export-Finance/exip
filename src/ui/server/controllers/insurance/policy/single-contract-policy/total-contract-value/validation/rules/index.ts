import totalContractValueRules from './total-contract-value';
import creditLimitRules from './credit-limit';
import { ValidationErrors } from '../../../../../../../../types';

const rules = [totalContractValueRules, creditLimitRules];

const validationRules = rules as Array<() => ValidationErrors>;

export default validationRules;
