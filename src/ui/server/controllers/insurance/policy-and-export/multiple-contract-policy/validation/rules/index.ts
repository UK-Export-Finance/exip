import requestedStartDateRules from '../../../../../../shared-validation/requested-start-date';
import totalMonthsOfCoverRules from './total-months-of-cover';
import { ValidationErrors } from '../../../../../../../types';

const rules = [requestedStartDateRules, totalMonthsOfCoverRules] as Array<() => ValidationErrors>;

export default rules;
