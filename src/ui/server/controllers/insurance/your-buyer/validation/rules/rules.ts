import { countryValidationRules } from './countryValidationRules';
import { ValidationErrors } from '../../../../../../types';

const rules = [countryValidationRules] as Array<() => ValidationErrors>;

export default rules;
