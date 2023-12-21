import tradedWithBuyerRule from './traded-with-buyer';
import { ValidationErrors } from '../../../../../../../types';

const rules = [tradedWithBuyerRule] as Array<() => ValidationErrors>;

export default rules;
