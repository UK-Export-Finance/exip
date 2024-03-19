import financialAddressRules from '../../../../../../shared-validation/financial-address';
import bicSwiftCodeRules from './bic-or-swift-code';
import { ValidationErrors } from '../../../../../../../types';

const rules = [financialAddressRules, bicSwiftCodeRules] as Array<() => ValidationErrors>;

export default rules;
