import connectedToBuyerRule from './connected-to-buyer';
import tradedWithBuyerRule from './connection-with-buyer-description';
import { ValidationErrors } from '../../../../../../../types';

const rules = [connectedToBuyerRule, tradedWithBuyerRule] as Array<() => ValidationErrors>;

export default rules;
