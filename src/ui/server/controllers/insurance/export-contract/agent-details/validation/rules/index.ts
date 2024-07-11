import nameRule from './name';
import fullAddressRule from './full-address';
import countryCodeRule from './country-code';
import { ValidationErrors } from '../../../../../../../types';

const rules = [nameRule, fullAddressRule, countryCodeRule];

const validationRules = rules as Array<() => ValidationErrors>;

export default validationRules;
