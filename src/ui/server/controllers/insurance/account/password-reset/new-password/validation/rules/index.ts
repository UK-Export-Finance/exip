import passwordRules from './password';
import { ValidationErrors } from '../../../../../../../../types';

const rules = [passwordRules];

const validationRules = rules as Array<() => ValidationErrors>;

export default validationRules;
