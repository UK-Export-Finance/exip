import serviceDescriptionRule from './service-description';
import isChargingRule from './is-charging';
import { ValidationErrors } from '../../../../../../../types';

const rules = [serviceDescriptionRule, isChargingRule];

const validationRules = rules as Array<() => ValidationErrors>;

export default validationRules;
