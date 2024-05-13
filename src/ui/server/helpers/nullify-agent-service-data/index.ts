import FIELD_IDS from '../../constants/field-ids/insurance/export-contract';

const {
  AGENT_SERVICE: { IS_CHARGING, SERVICE_DESCRIPTION },
} = FIELD_IDS;

/**
 * nullifyAgentServiceData
 * Create an object with null AGENT_SERVICE fields.
 * @returns {ApplicationExportContractAgentService}
 */
const nullifyAgentServiceData = () => ({
  [IS_CHARGING]: null,
  [SERVICE_DESCRIPTION]: '',
});

export default nullifyAgentServiceData;
