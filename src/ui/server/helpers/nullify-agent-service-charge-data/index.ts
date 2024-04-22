import FIELD_IDS from '../../constants/field-ids/insurance/export-contract';

const {
  AGENT_CHARGES: { CHARGE_PERCENTAGE, FIXED_SUM_AMOUNT, METHOD, PAYABLE_COUNTRY_CODE },
} = FIELD_IDS;

/**
 * nullifyAgentServiceChargeData
 * Create an object with null AGENT_CHARGES fields.
 * @returns {ApplicationExportContractAgentServiceCharge}
 */
const nullifyAgentServiceChargeData = () => ({
  [CHARGE_PERCENTAGE]: null,
  [FIXED_SUM_AMOUNT]: null,
  [METHOD]: null,
  [PAYABLE_COUNTRY_CODE]: '',
});

export default nullifyAgentServiceChargeData;
