import requestedStartDateRules from '../../../../../../shared-validation/requested-start-date';
import policyCurrencyCodeRules from '../../../../../../shared-validation/policy-currency-code';
import totalMonthsOfCoverRules from './total-months-of-cover';
import totalSalesToBuyerRules from './total-sales-to-buyer';
import maximumBuyerWillOweRules from './maximum-buyer-will-owe';
import { ValidationErrors } from '../../../../../../../types';

const rules = [requestedStartDateRules, totalMonthsOfCoverRules, totalSalesToBuyerRules, maximumBuyerWillOweRules, policyCurrencyCodeRules];

const validationRules = rules as Array<() => ValidationErrors>;

export default validationRules;
