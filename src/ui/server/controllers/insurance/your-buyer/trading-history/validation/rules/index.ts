import outstandingPaymentsRule from './outstanding-payments';
import { ValidationErrors } from '../../../../../../../types';

const rules = [outstandingPaymentsRule] as Array<() => ValidationErrors>;

export default rules;
