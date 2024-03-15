// import sortCodeRules from './sort-code';
// import accountNumberRules from './account-number';
import financialAddressRules from '../../../../../../shared-validation/financial-address';
import { ValidationErrors } from '../../../../../../../types';

const rules = [financialAddressRules] as Array<() => ValidationErrors>;

export default rules;
