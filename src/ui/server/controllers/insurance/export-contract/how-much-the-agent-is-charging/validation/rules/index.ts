import fixedSumAmountRule from './fixed-sum-amount';
import { ValidationErrors } from '../../../../../../../types';

const rules = [fixedSumAmountRule];

const validationRules = rules as Array<() => ValidationErrors>;

export default validationRules;
