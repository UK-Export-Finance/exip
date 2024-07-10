import alternativeTradingAddress from './alternative-trading-address';
import { ValidationErrors } from '../../../../../../../types';

const rules = [alternativeTradingAddress] as Array<() => ValidationErrors>;

export default rules;
