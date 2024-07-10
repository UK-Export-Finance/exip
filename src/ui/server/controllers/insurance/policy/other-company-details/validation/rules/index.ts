import companyNameRule from './company-name';
import countryCodeRule from './country-code';
import companyNumberRule from './company-number';
import { ValidationErrors } from '../../../../../../../types';

const rules = [companyNameRule, countryCodeRule, companyNumberRule];

const validationRules = rules as Array<() => ValidationErrors>;

export default validationRules;
