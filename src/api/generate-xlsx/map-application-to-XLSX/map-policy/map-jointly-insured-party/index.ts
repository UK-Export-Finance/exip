import FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import { XLSX } from '../../../../content-strings';
import xlsxRow from '../../helpers/xlsx-row';
import mapYesNoField from '../../helpers/map-yes-no-field';
import getCountryByIsoCode from '../../../../helpers/get-country-by-iso-code';
import { ApplicationJointlyInsuredParty, Country } from '../../../../types';

const { FIELDS } = XLSX;

const {
  REQUESTED_JOINTLY_INSURED_PARTY: { REQUESTED, COMPANY_NAME, COMPANY_NUMBER, COUNTRY_CODE },
} = FIELD_IDS;

/**
 * mapJointlyInsuredParty
 * Map an application's "jointly insured party" fields into an array of objects for XLSX generation
 * @param {ApplicationJointlyInsuredParty} party: Application's jointly insured party
 * @param {Array<Country>} countries: Countries
 * @returns {Array<object>} Array of objects for XLSX generation
 */
const mapJointlyInsuredParty = (party: ApplicationJointlyInsuredParty, countries: Array<Country>) => {
  const requestedParty = party[REQUESTED];

  let mapped = [xlsxRow(String(FIELDS.JOINTLY_INSURED_PARTY[REQUESTED]), mapYesNoField({ answer: requestedParty }))];

  const country = getCountryByIsoCode(countries, party[COUNTRY_CODE]);

  if (requestedParty) {
    mapped = [
      ...mapped,
      xlsxRow(String(FIELDS.JOINTLY_INSURED_PARTY[COMPANY_NAME]), party[COMPANY_NAME]),
      xlsxRow(String(FIELDS.JOINTLY_INSURED_PARTY[COUNTRY_CODE]), country.name),
      xlsxRow(String(FIELDS.JOINTLY_INSURED_PARTY[COMPANY_NUMBER]), party[COMPANY_NUMBER]),
    ];
  }

  return mapped;
};

export default mapJointlyInsuredParty;
