import requestedStartDateRules from './requested-start-date';
import totalContractValueRules from './total-contract-value';
import { ValidationErrors } from '../../../../../../../types';

const rules = [requestedStartDateRules, totalContractValueRules] as Array<() => ValidationErrors>;

export default rules;
