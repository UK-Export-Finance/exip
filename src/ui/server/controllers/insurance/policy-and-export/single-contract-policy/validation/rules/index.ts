import requestedStartDateRules from './requested-start-date';
import contractCompletionDateRules from './contract-completion-date';
import totalContractValueRules from './total-contract-value';
import creditPeriodWithBuyerRules from './credit-period-with-buyer';
import { ValidationErrors } from '../../../../../../../types';

const rules = [requestedStartDateRules, contractCompletionDateRules, totalContractValueRules, creditPeriodWithBuyerRules] as Array<() => ValidationErrors>;

export default rules;
