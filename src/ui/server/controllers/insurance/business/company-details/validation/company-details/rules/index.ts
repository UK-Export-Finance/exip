import tradingName from './trading-name';
import tradingAddress from './trading-address';
import { ValidationErrors } from '../../../../../../../../types';
import companyWebsite from './company-website';

const rules = [tradingName, tradingAddress, companyWebsite] as Array<() => ValidationErrors>;

export default rules;
