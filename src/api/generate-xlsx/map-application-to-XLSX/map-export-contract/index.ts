import FIELD_IDS from '../../../constants/field-ids/insurance/export-contract';
import { XLSX } from '../../../content-strings';
import xlsxRow from '../helpers/xlsx-row';
import mapFinalDestination from './map-final-destination';
import mapPrivateMarket from './map-private-market';
import mapAgent from './map-agent';
import { Application, Country } from '../../../types';

const { FIELDS, SECTION_TITLES } = XLSX;

const {
  ABOUT_GOODS_OR_SERVICES: { DESCRIPTION },
  HOW_WILL_YOU_GET_PAID: { PAYMENT_TERMS_DESCRIPTION },
} = FIELD_IDS;

/**
 * mapExportContract
 * Map an application's export contract fields into an array of objects for XLSX generation
 * @param {Application} application: Application
 * @param {Array<Country>} countries: Array of countries
 * @returns {Array<object>} Array of objects for XLSX generation
 */
const mapExportContract = (application: Application, countries: Array<Country>) => {
  const {
    eligibility: { totalContractValue },
    exportContract,
  } = application;

  const { agent, privateMarket } = exportContract;

  const mapped = [
    xlsxRow(SECTION_TITLES.EXPORT_CONTRACT, ''),

    xlsxRow(String(FIELDS.EXPORT_CONTRACT[DESCRIPTION]), exportContract[DESCRIPTION]),

    ...mapFinalDestination(exportContract, countries),

    xlsxRow(String(FIELDS.EXPORT_CONTRACT[PAYMENT_TERMS_DESCRIPTION]), exportContract[PAYMENT_TERMS_DESCRIPTION]),

    ...mapPrivateMarket(privateMarket, totalContractValue),

    ...mapAgent(agent, countries),
  ];

  return mapped;
};

export default mapExportContract;
