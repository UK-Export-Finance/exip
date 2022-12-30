import currencyRules from './currency';
import { costRules } from './cost';
import creditPeriodRules from './credit-period';
import percentageOfCoverRules from './percentage-of-cover';
import { ValidationErrors } from '../../../../../../types';

const rules = [currencyRules, costRules, percentageOfCoverRules, creditPeriodRules] as Array<() => ValidationErrors>;

export default rules;
