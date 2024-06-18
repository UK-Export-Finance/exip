import FIELD_IDS from '../../../../constants/field-ids/insurance/export-contract';
import { XLSX } from '../../../../content-strings';
import xlsxRow from '../../helpers/xlsx-row';
import mapYesNoField from '../../helpers/map-yes-no-field';
import mapAgentCharge from './map-agent-charge';
import getCountryByIsoCode from '../../../../helpers/get-country-by-iso-code';
import { ApplicationExportContractAgent, Country } from '../../../../types';

const { FIELDS } = XLSX;

const {
  AGENT_DETAILS: { NAME, FULL_ADDRESS, COUNTRY_CODE },
  AGENT_SERVICE: { SERVICE_DESCRIPTION },
  USING_AGENT,
} = FIELD_IDS;

/**
 * mapAgent
 * Map an application's "export contract agent" fields into an array of objects for XLSX generation
 * @param {ApplicationExportContractAgent} agent: Export contract agent
 * @param {Array<Country>} countries
 * @returns {Array<object>} Array of objects for XLSX generation
 */
const mapAgent = (agent: ApplicationExportContractAgent, countries: Array<Country>) => {
  const usingAgentAnswer = agent[USING_AGENT];

  let mapped = [xlsxRow(String(FIELDS.EXPORT_CONTRACT[USING_AGENT]), mapYesNoField({ answer: usingAgentAnswer }))];

  if (usingAgentAnswer) {
    const { service } = agent;

    const country = getCountryByIsoCode(countries, agent[COUNTRY_CODE]);

    mapped = [
      ...mapped,
      xlsxRow(String(FIELDS.AGENT[NAME]), agent[NAME]),
      xlsxRow(String(FIELDS.AGENT[FULL_ADDRESS]), agent[FULL_ADDRESS]),
      xlsxRow(String(FIELDS.AGENT[COUNTRY_CODE]), country.name),
      xlsxRow(String(FIELDS.AGENT_SERVICE[SERVICE_DESCRIPTION]), service[SERVICE_DESCRIPTION]),

      ...mapAgentCharge(service),
    ];
  }

  return mapped;
};

export default mapAgent;
