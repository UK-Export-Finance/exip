import requestedStartDateRules from '../../../../../../shared-validation/requested-start-date';
import policyCurrencyCodeRules from '../../../../../../shared-validation/policy-currency-code';
import totalMonthsOfCoverRules from './total-months-of-cover';
import { ValidationErrors } from '../../../../../../../types';

const rules = [requestedStartDateRules, totalMonthsOfCoverRules, policyCurrencyCodeRules];

const validationRules = rules as Array<() => ValidationErrors>;

export default validationRules;
