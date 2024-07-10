import requestedStartDateRules from '../../../../../../shared-validation/requested-start-date';
import policyCurrencyCodeRules from '../../../../../../shared-validation/policy-currency-code';
import policyAlternativeCurrencyCodeRule from '../../../../../../shared-validation/policy-alternative-currency-code';
import contractCompletionDateRules from './contract-completion-date';
import { ValidationErrors } from '../../../../../../../types';

const rules = [requestedStartDateRules, contractCompletionDateRules, policyCurrencyCodeRules, policyAlternativeCurrencyCodeRule];

const validationRules = rules as Array<() => ValidationErrors>;

export default validationRules;
