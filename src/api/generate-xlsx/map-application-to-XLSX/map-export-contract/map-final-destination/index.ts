import FIELD_IDS from '../../../../constants/field-ids/insurance/export-contract';
import { XLSX } from '../../../../content-strings';
import { EXPORT_CONTRACT_FIELDS } from '../../../../content-strings/fields/insurance/export-contract';
import xlsxRow from '../../helpers/xlsx-row';
import mapYesNoField from '../../helpers/map-yes-no-field';
import getCountryByIsoCode from '../../../../helpers/get-country-by-iso-code';
import { ApplicationExportContract, Country } from '../../../../types';

const CONTENT_STRINGS = EXPORT_CONTRACT_FIELDS.ABOUT_GOODS_OR_SERVICES;

const { FIELDS } = XLSX;

const {
  ABOUT_GOODS_OR_SERVICES: { FINAL_DESTINATION, FINAL_DESTINATION_KNOWN },
} = FIELD_IDS;

/**
 * mapFinalDestination
 * Map an application's export contract - FINAL_DESTINATION answers into an array of objects for XLSX generation
 * @param {ApplicationExportContract} application: Application export contract
 * @param {Array<Country>} countries: Array of countries
 * @returns {Array<object>} Array of objects for XLSX generation
 */
const mapFinalDestination = (exportContract: ApplicationExportContract, countries: Array<Country>) => {
  const finalDestinationKnownAnswer = exportContract[FINAL_DESTINATION_KNOWN];

  const mapped = [xlsxRow(String(FIELDS.EXPORT_CONTRACT[FINAL_DESTINATION_KNOWN]), mapYesNoField({ answer: finalDestinationKnownAnswer }))];

  if (finalDestinationKnownAnswer) {
    const country = getCountryByIsoCode(countries, exportContract[FINAL_DESTINATION]);

    mapped.push(xlsxRow(String(CONTENT_STRINGS[FINAL_DESTINATION]), String(country)));
  }

  return mapped;
};

export default mapFinalDestination;
