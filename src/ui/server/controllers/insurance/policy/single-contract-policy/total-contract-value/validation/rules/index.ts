import totalContractValueRules from './total-contract-value';
import requestedCreditLimitRules from './requested-credit-limit';
import { ValidationErrors } from '../../../../../../../../types';

const rules = [totalContractValueRules, requestedCreditLimitRules];

const validationRules = rules as Array<() => ValidationErrors>;

export default validationRules;
