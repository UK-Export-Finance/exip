import fullAddressRules from './full-address';
import { ValidationErrors } from '../../../../../../../types';

const rules = [fullAddressRules];

const validationRules = rules as Array<() => ValidationErrors>;

export default validationRules;
