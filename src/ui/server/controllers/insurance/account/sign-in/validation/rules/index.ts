import emailRules from './email';
import passwordRules from './password';
import { ValidationErrors } from '../../../../../../../types';

const rules = [emailRules, passwordRules];

const validationRules = rules as Array<() => ValidationErrors>;

export default validationRules;
