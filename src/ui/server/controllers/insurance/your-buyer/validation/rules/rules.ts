import { validationRules } from './validationRules';
import { ValidationErrors } from '../../../../../../types';

const rules = [validationRules] as Array<() => ValidationErrors>;

export default rules;
