import firstName from './first-name';
import lastName from './last-name';
import email from './email';
import position from './position';
import { ValidationErrors } from '../../../../../../../types';

const rules = [firstName, lastName, email, position] as Array<() => ValidationErrors>;

export default rules;
