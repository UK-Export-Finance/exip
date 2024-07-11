import FIELD_IDS from '../../../../../constants/field-ids/insurance/export-contract';
import { XLSX } from '../../../../../content-strings';
import xlsxRow from '../../../helpers/xlsx-row';
import mapYesNoField from '../../../helpers/map-yes-no-field';
import mapAgentChargeAmount from './map-agent-charge-amount';
import { ApplicationExportContractAgentService, Country } from '../../../../../types';

const { FIELDS } = XLSX;

const {
  AGENT_SERVICE: { IS_CHARGING },
} = FIELD_IDS;

/**
 * mapAgentCharge
 * Map an application's "export contract agent charge" fields into an array of objects for XLSX generation
 * @param {ApplicationExportContractAgentService} agent: Export contract agent
 * @param {Array<Country>} countries
 * @returns {Array<object>} Array of objects for XLSX generation
 */
const mapAgentCharge = (service: ApplicationExportContractAgentService, countries: Array<Country>) => {
  const { charge } = service;

  const chargingAnswer = service[IS_CHARGING];

  let mapped = [xlsxRow(String(FIELDS.AGENT_SERVICE[IS_CHARGING]), mapYesNoField({ answer: chargingAnswer }))];

  if (chargingAnswer) {
    mapped = [...mapped, ...mapAgentChargeAmount(charge, countries)];
  }

  return mapped;
};

export default mapAgentCharge;
