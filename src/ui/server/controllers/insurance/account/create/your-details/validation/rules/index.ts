import firstNameRules from './first-name';
import { ValidationErrors } from '../../../../../../../../types';

const rules = [firstNameRules];

const validationRules = rules as Array<() => ValidationErrors>;

export default validationRules;
