import emailRules from './email';
import { ValidationErrors } from '../../../../../../../types';

const rules = [emailRules];

const validationRules = rules as Array<() => ValidationErrors>;

export default validationRules;
