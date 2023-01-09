import tradingName from './trading-name';
import tradingAddress from './trading-address';
import { ValidationErrors } from '../../../../../../../../types';
import companyWebsite from './company-website';
import phoneNumber from './phone-number';

const rules = [tradingName, tradingAddress, companyWebsite, phoneNumber] as Array<() => ValidationErrors>;

export default rules;
