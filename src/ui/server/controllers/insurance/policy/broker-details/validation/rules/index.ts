import nameRules from './name';
import emailRules from './email';
import fullAddressRules from './full-address';
import { ValidationErrors } from '../../../../../../../types';

const rules = [nameRules, emailRules, fullAddressRules];

const validationRules = rules as Array<() => ValidationErrors>;

export default validationRules;
