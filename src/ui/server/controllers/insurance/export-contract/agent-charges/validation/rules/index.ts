import methodRule from './method';
import payableCountryCodeRule from './payable-country-code';
import { ValidationErrors } from '../../../../../../../types';

const rules = [methodRule, payableCountryCodeRule];

const validationRules = rules as Array<() => ValidationErrors>;

export default validationRules;
