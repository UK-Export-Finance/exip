import nameRules from './name';
import emailRules from './email';

// TODO: EMS-3978
// import fullAddressRules from './full-address';
import { ValidationErrors } from '../../../../../../../types';

// const rules = [nameRules, emailRules, fullAddressRules];
const rules = [nameRules, emailRules];

const validationRules = rules as Array<() => ValidationErrors>;

export default validationRules;
