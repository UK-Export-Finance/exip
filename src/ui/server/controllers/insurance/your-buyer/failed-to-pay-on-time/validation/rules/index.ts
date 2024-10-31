import failedPaymentsRule from './failed-payments';
import { ValidationErrors } from '../../../../../../../types';

const rules = [failedPaymentsRule] as Array<() => ValidationErrors>;

export default rules;
