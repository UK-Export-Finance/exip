import connectedWithBuyerRule from './connected-with-buyer';
import connectionWithBuyerDescriptionRule from './connection-with-buyer-description';
import { ValidationErrors } from '../../../../../../../types';

const rules = [connectedWithBuyerRule, connectionWithBuyerDescriptionRule] as Array<() => ValidationErrors>;

export default rules;
