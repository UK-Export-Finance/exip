import requestedStartDateRules from '../../../../../../shared-validation/requested-start-date';
import policyCurrencyCodeRules from '../../../../../../shared-validation/policy-currency-code';
import contractCompletionDateRules from './contract-completion-date';
import { ValidationErrors } from '../../../../../../../types';

const rules = [requestedStartDateRules, contractCompletionDateRules, policyCurrencyCodeRules];

const validationRules = rules as Array<() => ValidationErrors>;

export default validationRules;
