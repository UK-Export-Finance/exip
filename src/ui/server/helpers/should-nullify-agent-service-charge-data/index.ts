import { objectHasKeysAndValues } from '../object';
import FIELD_IDS from '../../constants/field-ids/insurance/export-contract';
import { RequestBody, ApplicationExportContractAgentServiceCharge } from '../../../types';

const {
  AGENT_SERVICE: { IS_CHARGING },
} = FIELD_IDS;

/**
 * shouldNullifyAgentServiceChargeData
 * Check if we should nullify agent service charge data.
 * If IS_CHARGING is true and the application has some charge data, the charge data should be nullified.
 * @param {RequestBody} formBody: Form body
 * @param {ApplicationExportContractAgentServiceCharge} chargeData: Agent service charge data
 * @returns {Boolean}
 */
const shouldNullifyAgentServiceChargeData = (formBody: RequestBody, chargeData: ApplicationExportContractAgentServiceCharge) => {
  const isNotCharging = formBody[IS_CHARGING] === 'false';

  const { id, ...otherFields } = chargeData;

  const hasAgentServiceChargeData = objectHasKeysAndValues(otherFields);

  if (isNotCharging && hasAgentServiceChargeData) {
    return true;
  }

  return false;
};

export default shouldNullifyAgentServiceChargeData;
