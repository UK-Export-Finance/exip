import FIELD_IDS from '../../../../../../constants/field-ids/insurance/export-contract';
import { XLSX } from '../../../../../../content-strings';
import xlsxRow from '../../../../helpers/xlsx-row';
import getCountryByIsoCode from '../../../../../../helpers/get-country-by-iso-code';
import formatCurrency from '../../../../helpers/format-currency';
import { ApplicationExportContractAgentServiceCharge, Country } from '../../../../../../types';

const { FIELDS } = XLSX;

const {
  AGENT_CHARGES: { FIXED_SUM_AMOUNT, FIXED_SUM_CURRENCY_CODE, PAYABLE_COUNTRY_CODE, PERCENTAGE_CHARGE },
} = FIELD_IDS;

/**
 * mapAgentChargeAmount
 * Map an application's "export contract agent charge amount" fields into an array of objects for XLSX generation
 * @param {ApplicationExportContractAgentServiceCharge} charge: Export contract agent charge
 * @param {Array<Country>} countries
 * @returns {Array<object>} Array of objects for XLSX generation
 */
const mapAgentChargeAmount = (charge: ApplicationExportContractAgentServiceCharge, countries: Array<Country>) => {
  const country = getCountryByIsoCode(countries, charge[PAYABLE_COUNTRY_CODE]);

  const payableCountryRow = xlsxRow(String(FIELDS.AGENT_CHARGES[PAYABLE_COUNTRY_CODE]), country.name);

  if (charge[FIXED_SUM_AMOUNT]) {
    const currencyValue = formatCurrency(Number(charge[FIXED_SUM_AMOUNT]), charge[FIXED_SUM_CURRENCY_CODE]);

    const mapped = [xlsxRow(String(FIELDS.AGENT_CHARGES[FIXED_SUM_AMOUNT]), currencyValue), payableCountryRow];

    return mapped;
  }

  if (charge[PERCENTAGE_CHARGE]) {
    const mapped = [xlsxRow(String(FIELDS.AGENT_CHARGES[PERCENTAGE_CHARGE]), `${charge[PERCENTAGE_CHARGE]}%`), payableCountryRow];

    return mapped;
  }

  return [];
};

export default mapAgentChargeAmount;
