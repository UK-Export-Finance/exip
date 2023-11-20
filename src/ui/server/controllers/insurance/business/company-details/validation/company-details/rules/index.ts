import tradingName from './trading-name';
import tradingAddress from './trading-address';
import { ValidationErrors } from '../../../../../../../../types';
import companyWebsite from './company-website';
import phoneNumber from './phone-number';
import alternativeTradingName from './alternative-trading-name';

const rules = [tradingName, alternativeTradingName, tradingAddress, companyWebsite, phoneNumber] as Array<() => ValidationErrors>;

export default rules;
