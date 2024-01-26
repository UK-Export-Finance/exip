import creditInsuranceCoverRule from './credit-insurance-cover';
import creditInsuranceCoverDescriptionRule from './credit-insurance-cover-description';
import { ValidationErrors } from '../../../../../../../types';

const rules = [creditInsuranceCoverRule, creditInsuranceCoverDescriptionRule] as Array<() => ValidationErrors>;

export default rules;
