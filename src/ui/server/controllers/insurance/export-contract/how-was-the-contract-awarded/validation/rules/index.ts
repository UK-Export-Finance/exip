import awardMethodRule from './award-method';
import otherAwardMethodRule from './other-award-method';
import { ValidationErrors } from '../../../../../../../types';

const rules = [awardMethodRule, otherAwardMethodRule] as Array<() => ValidationErrors>;

export default rules;
