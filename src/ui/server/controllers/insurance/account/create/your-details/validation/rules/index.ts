import firstNameRules from './first-name';
import lastNameRules from './last-name';
import emailRules from './email';
import passwordRules from './password';
import { ValidationErrors } from '../../../../../../../../types';

const rules = [firstNameRules, lastNameRules, emailRules, passwordRules];

const validationRules = rules as Array<() => ValidationErrors>;

export default validationRules;
