import accessCodeRules from './access-code';
import { ValidationErrors } from '../../../../../../../../types';

const rules = [accessCodeRules];

const validationRules = rules as Array<() => ValidationErrors>;

export default validationRules;
