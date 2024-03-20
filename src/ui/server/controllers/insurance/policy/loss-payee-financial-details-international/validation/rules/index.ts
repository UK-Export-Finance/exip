import bicSwiftCodeRules from './bic-or-swift-code';
import financialAddressRules from '../../../../../../shared-validation/financial-address';
import { ValidationErrors } from '../../../../../../../types';

const rules = [bicSwiftCodeRules, financialAddressRules] as Array<() => ValidationErrors>;

export default rules;
