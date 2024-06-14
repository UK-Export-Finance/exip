import FIELD_IDS from '../../../../constants/field-ids/insurance/export-contract';
import { XLSX } from '../../../../content-strings';
import xlsxRow from '../../helpers/xlsx-row';
import mapYesNoField from '../../helpers/map-yes-no-field';
import mapAgentCharge from './map-agent-charge';
import { ApplicationExportContractAgent } from '../../../../types';

const { FIELDS } = XLSX;

const {
  // AGENT_CHARGES: { METHOD, PAYABLE_COUNTRY_CODE, FIXED_SUM, FIXED_SUM_AMOUNT, FIXED_SUM_CURRENCY_CODE, PERCENTAGE, PERCENTAGE_CHARGE },
  AGENT_DETAILS: { NAME, FULL_ADDRESS, COUNTRY_CODE },
  AGENT_SERVICE: { SERVICE_DESCRIPTION },
  USING_AGENT,
} = FIELD_IDS;

/**
 * mapAgent
 * Map an application's "export contract agent" fields into an array of objects for XLSX generation
 * @param {ApplicationExportContractAgent} agent: Export contract agent
 * @returns {Array<object>} Array of objects for XLSX generation
 */
const mapAgent = (agent: ApplicationExportContractAgent) => {
  const usingAgentAnswer = agent[USING_AGENT];

  let mapped = [xlsxRow(String(FIELDS.EXPORT_CONTRACT[USING_AGENT]), mapYesNoField({ answer: usingAgentAnswer }))];

  if (usingAgentAnswer) {
    const { service } = agent;

    mapped = [
      ...mapped,
      xlsxRow(String(FIELDS.AGENT[NAME]), agent[NAME]),
      xlsxRow(String(FIELDS.AGENT[FULL_ADDRESS]), agent[FULL_ADDRESS]),
      xlsxRow(String(FIELDS.AGENT[COUNTRY_CODE]), agent[COUNTRY_CODE]),
      xlsxRow(String(FIELDS.AGENT_SERVICE[SERVICE_DESCRIPTION]), service[SERVICE_DESCRIPTION]),

      ...mapAgentCharge(service),
    ];
  }

  return mapped;
};

export default mapAgent;
