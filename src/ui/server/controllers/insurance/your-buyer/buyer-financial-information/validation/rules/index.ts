import buyerFinancialInformationRule from './buyer-financial-information';
import { ValidationErrors } from '../../../../../../../types';

const rules = [buyerFinancialInformationRule] as Array<() => ValidationErrors>;

export default rules;
