import sortCodeRules from './sort-code';
import accountNumberRules from './account-number';
import financialAddressRules from './financial-address';
import { ValidationErrors } from '../../../../../../../types';

const rules = [sortCodeRules, accountNumberRules, financialAddressRules] as Array<() => ValidationErrors>;

export default rules;
