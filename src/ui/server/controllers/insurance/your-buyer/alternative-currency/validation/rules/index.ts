import alternativeCurrencyRule from './alternative-currency';
import { ValidationErrors } from '../../../../../../../types';

const rules = [alternativeCurrencyRule] as Array<() => ValidationErrors>;

export default rules;
