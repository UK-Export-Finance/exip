import tradingName from './trading-name';
import tradingAddress from './trading-address';
import { ValidationErrors } from '../../../../../../../../types';

const rules = [tradingName, tradingAddress] as Array<() => ValidationErrors>;

export default rules;
