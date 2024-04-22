import currencyRule from './currency';
import alternativeCurrencyRule from './alternative-currency';
import { ValidationErrors } from '../../../../../../../../types';

const rules = [currencyRule, alternativeCurrencyRule] as Array<() => ValidationErrors>;

export default rules;
