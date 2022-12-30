import requestedStartDateRules from '../../../../../../shared-validation/requested-start-date';
import { ValidationErrors } from '../../../../../../../types';

const rules = [requestedStartDateRules] as Array<() => ValidationErrors>;

export default rules;
