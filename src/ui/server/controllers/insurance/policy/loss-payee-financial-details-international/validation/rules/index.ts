import financialAddressRules from '../../../../../../shared-validation/financial-address';
import { ValidationErrors } from '../../../../../../../types';

const rules = [financialAddressRules] as Array<() => ValidationErrors>;

export default rules;
