import tradingName from './trading-name';
import tradingAddress from './trading-address';
import { ValidationErrors } from '../../../../../../../../types';
import companyWebsite from './company-website';
import phoneNumber from './phone-number';
import differentTradingName from './different-trading-name';

const rules = [tradingName, differentTradingName, tradingAddress, companyWebsite, phoneNumber] as Array<() => ValidationErrors>;

export default rules;
