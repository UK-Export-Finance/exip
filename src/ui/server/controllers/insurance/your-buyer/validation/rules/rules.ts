import { validationRules } from './formValidationRules';
import { ValidationErrors } from '../../../../../../types';

const rules = [validationRules] as Array<() => ValidationErrors>;

export default rules;
