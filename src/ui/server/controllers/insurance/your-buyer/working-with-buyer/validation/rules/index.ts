import connectedToBuyerRule from './connected-to-buyer';
import tradedWithBuyerRule from './traded-with-buyer';
import { ValidationErrors } from '../../../../../../../types';

const rules = [connectedToBuyerRule, tradedWithBuyerRule] as Array<() => ValidationErrors>;

export default rules;
