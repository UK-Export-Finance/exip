import totalOutstandingRules from './total-outstanding';
import amountOverdueRules from './amount-overdue';
import { ValidationErrors } from '../../../../../../../types';

const rules = [totalOutstandingRules, amountOverdueRules] as Array<() => ValidationErrors>;

export default rules;
