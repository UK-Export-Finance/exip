import bicSwiftCodeRules from './bic-or-swift-code';
import ibanRules from './iban';
import financialAddressRules from '../../../../../../shared-validation/financial-address';
import { ValidationErrors } from '../../../../../../../types';

const rules = [bicSwiftCodeRules, ibanRules, financialAddressRules] as Array<() => ValidationErrors>;

export default rules;
