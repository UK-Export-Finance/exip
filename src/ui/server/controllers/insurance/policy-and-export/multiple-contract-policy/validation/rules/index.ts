import requestedStartDateRules from '../../../../../../shared-validation/requested-start-date';
import totalMonthsOfCoverRules from './total-months-of-cover';
import totalSalesToBuyerRules from './total-sales-to-buyer';
import { ValidationErrors } from '../../../../../../../types';

const rules = [requestedStartDateRules, totalMonthsOfCoverRules, totalSalesToBuyerRules] as Array<() => ValidationErrors>;

export default rules;
