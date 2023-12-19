import connectedToBuyerRule from './connected-to-buyer';
import connectionWithBuyerDescriptionRule from './connection-with-buyer-description';
import { ValidationErrors } from '../../../../../../../types';

const rules = [connectedToBuyerRule, connectionWithBuyerDescriptionRule] as Array<() => ValidationErrors>;

export default rules;
