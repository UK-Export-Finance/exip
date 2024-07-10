import totalContractValueRules from './total-contract-value';
import { ValidationErrors } from '../../../../../../../../types';

const rules = [totalContractValueRules];

const validationRules = rules as Array<() => ValidationErrors>;

export default validationRules;
