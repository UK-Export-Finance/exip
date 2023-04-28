import firstName from './first-name';
import lastName from './last-name';
import emailAddress from './email-address';
import position from './position';
import { ValidationErrors } from '../../../../../../../types';

const rules = [firstName, lastName, emailAddress, position] as Array<() => ValidationErrors>;

export default rules;
