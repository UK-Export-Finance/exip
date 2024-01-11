import outstandingPaymentsRule from './outstanding-payments';
import failedPaymentsRule from './failed-payments';
import { ValidationErrors } from '../../../../../../../types';

const rules = [outstandingPaymentsRule, failedPaymentsRule] as Array<() => ValidationErrors>;

export default rules;
