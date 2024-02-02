import requestedStartDateRules from '../../../../../../shared-validation/requested-start-date';
import policyCurrencyCodeRule from '../../../../../../shared-validation/policy-currency-code';
import policyAlternativeCurrencyCodeRule from '../../../../../../shared-validation/policy-alternative-currency-code';
import totalMonthsOfCoverRules from './total-months-of-cover';
import { ValidationErrors } from '../../../../../../../types';

const rules = [requestedStartDateRules, totalMonthsOfCoverRules, policyCurrencyCodeRule, policyAlternativeCurrencyCodeRule];

const validationRules = rules as Array<() => ValidationErrors>;

export default validationRules;
