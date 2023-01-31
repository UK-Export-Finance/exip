import firstNameRules from './first-name';
import lastNameRules from './last-name';
import { ValidationErrors } from '../../../../../../../../types';

const rules = [firstNameRules, lastNameRules];

const validationRules = rules as Array<() => ValidationErrors>;

export default validationRules;
