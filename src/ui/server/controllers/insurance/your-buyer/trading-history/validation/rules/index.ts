import outstandingPaymentsRule from './outstanding-payments';
import failedPaymentsRule from './failed-payments';
import totalOutstandingRules from './total-outstanding';
import amountOverdueRules from './amount-overdue';
import { ValidationErrors } from '../../../../../../../types';

const rules = [outstandingPaymentsRule, failedPaymentsRule, totalOutstandingRules, amountOverdueRules] as Array<() => ValidationErrors>;

export default rules;
