import isUsingBrokerRules from './using-broker';
import brokerName from './broker-name';
import brokerAddressLineOne from './broker-address-line-one';
import brokerTown from './broker-town';
import brokerEmail from './broker-email';
import brokerPostcode from './broker-postcode';
import { ValidationErrors } from '../../../../../../../types';

const rules = [isUsingBrokerRules, brokerName, brokerAddressLineOne, brokerTown, brokerEmail, brokerPostcode] as Array<() => ValidationErrors>;

export default rules;
