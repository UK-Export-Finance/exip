import connectionWithBuyerRule from './connection-with-buyer';
import connectionWithBuyerDescriptionRule from './connection-with-buyer-description';
import { ValidationErrors } from '../../../../../../../types';

const rules = [connectionWithBuyerRule, connectionWithBuyerDescriptionRule] as Array<() => ValidationErrors>;

export default rules;
