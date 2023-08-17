import policyLengthRules from './policy-length';
import currencyRules from './currency';
import { costRules } from './cost';
import creditPeriodRules from './credit-period';
import percentageOfCoverRules from './percentage-of-cover';
import { ValidationErrors } from '../../../../../../types';

const rules = [policyLengthRules, currencyRules, costRules, percentageOfCoverRules, creditPeriodRules] as Array<() => ValidationErrors>;

export default rules;
