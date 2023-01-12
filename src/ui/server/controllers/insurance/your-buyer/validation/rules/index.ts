import { countryValidationRules } from './countryValidationRules';
import { ValidationErrors } from '../../../../../../types';
import { organisationNameValidationRules } from './organisationNameValidationRules';

const rules = [countryValidationRules, organisationNameValidationRules] as Array<() => ValidationErrors>;

export default rules;
