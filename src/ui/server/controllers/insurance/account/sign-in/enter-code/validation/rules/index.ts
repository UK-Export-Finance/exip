import securityCodeRules from './security-code';
import { ValidationErrors } from '../../../../../../../../types';

const rules = [securityCodeRules];

const validationRules = rules as Array<() => ValidationErrors>;

export default validationRules;
