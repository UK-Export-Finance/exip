import FIELD_IDS from '../../../../../constants/field-ids/insurance/export-contract';
import { XLSX } from '../../../../../content-strings';
import xlsxRow from '../../../helpers/xlsx-row';
import mapYesNoField from '../../../helpers/map-yes-no-field';
import { ApplicationExportContractAgentService } from '../../../../../types';

const { FIELDS } = XLSX;

const {
  AGENT_CHARGES: { PAYABLE_COUNTRY_CODE },
  AGENT_SERVICE: { IS_CHARGING },
} = FIELD_IDS;

/**
 * mapAgentCharge
 * Map an application's "export contract agent charge" fields into an array of objects for XLSX generation
 * @param {ApplicationExportContractAgentService} agent: Export contract agent
 * @returns {Array<object>} Array of objects for XLSX generation
 */
const mapAgentCharge = (service: ApplicationExportContractAgentService) => {
  const { charge } = service;

  const chargingAnswer = service[IS_CHARGING];

  const mapped = [xlsxRow(String(FIELDS.AGENT_SERVICE[IS_CHARGING]), mapYesNoField({ answer: chargingAnswer }))];

  if (chargingAnswer) {
    // TODO: How much is the agent charging?

    mapped.push(xlsxRow('TODO - charges', 'TODO'), xlsxRow(String(FIELDS.AGENT_CHARGES[PAYABLE_COUNTRY_CODE]), charge[PAYABLE_COUNTRY_CODE]));
  }

  return mapped;
};

export default mapAgentCharge;
