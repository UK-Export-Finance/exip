import companyNameRule from './company-name';
import countryRule from './country';
import companyNumberRule from './company-number';
import { ValidationErrors } from '../../../../../../../types';

const rules = [companyNameRule, countryRule, companyNumberRule];

const validationRules = rules as Array<() => ValidationErrors>;

export default validationRules;
