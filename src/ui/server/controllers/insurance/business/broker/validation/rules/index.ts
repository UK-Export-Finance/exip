import isUsingBrokerRules from './using-broker';
import brokerName from './broker-name';
import brokerAddressLineOne from './broker-address-line-one';
import brokerTown from './broker-town';
import { ValidationErrors } from '../../../../../../../types';

const rules = [isUsingBrokerRules, brokerName, brokerAddressLineOne, brokerTown] as Array<() => ValidationErrors>;

export default rules;
