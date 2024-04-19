import { objectHasProperty, objectHasKeysAndValues } from '../object';
import FIELD_IDS from '../../constants/field-ids/insurance/export-contract';
import { RequestBody, ApplicationExportContractAgentServiceCharge } from '../../../types';

const {
  AGENT_SERVICE: { IS_CHARGING },
} = FIELD_IDS;

/**
 * shouldNullifyAgentServiceChargeData
 * Check if we should nullify agent service charge data.
 * If isCharging is true and the application has some charge data, the charge data should be nullified.
 * @param {RequestBody} formBody: Form body
 * @param {ApplicationExportContractAgentServiceCharge} chargeData: Agent service charge data
 * @returns {Boolean}
 */
const shouldNullifyAgentServiceChargeData = (formBody: RequestBody, chargeData: ApplicationExportContractAgentServiceCharge) => {
  const isCharging = objectHasProperty(formBody, IS_CHARGING);

  const { id, ...otherFields } = chargeData;

  const hasAgentServiceChargeData = objectHasKeysAndValues(otherFields);

  if (isCharging && hasAgentServiceChargeData) {
    return true;
  }

  return false;
};

export default shouldNullifyAgentServiceChargeData;
