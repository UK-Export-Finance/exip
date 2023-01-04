import requestedStartDateRules from '../../../../../../shared-validation/requested-start-date';
import totalMonthsOfCoverRules from './total-months-of-cover';
import totalSalesToBuyerRules from './total-sales-to-buyer';
import maximumBuyerWillOweRules from './maximum-buyer-will-owe';
import { ValidationErrors } from '../../../../../../../types';

const rules = [requestedStartDateRules, totalMonthsOfCoverRules, totalSalesToBuyerRules, maximumBuyerWillOweRules] as Array<() => ValidationErrors>;

export default rules;
