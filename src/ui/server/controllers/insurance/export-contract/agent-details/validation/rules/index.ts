import fullAddressRule from './full-address';
import countryCodeRule from './country-code';
import { ValidationErrors } from '../../../../../../../types';

const rules = [fullAddressRule, countryCodeRule];

const validationRules = rules as Array<() => ValidationErrors>;

export default validationRules;
