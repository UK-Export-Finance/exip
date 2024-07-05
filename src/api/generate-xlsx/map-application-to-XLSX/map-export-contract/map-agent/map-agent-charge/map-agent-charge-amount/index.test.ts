import mapAgentChargeAmount from '.';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/export-contract';
import { XLSX } from '../../../../../../content-strings';
import xlsxRow from '../../../../helpers/xlsx-row';
import getCountryByIsoCode from '../../../../../../helpers/get-country-by-iso-code';
import formatCurrency from '../../../../helpers/format-currency';
import { mockApplicationMinimalBrokerBuyerAndCompany, mockCountries } from '../../../../../../test-mocks';

const { FIELDS } = XLSX;

const {
  AGENT_CHARGES: { FIXED_SUM_AMOUNT, FIXED_SUM_CURRENCY_CODE, PAYABLE_COUNTRY_CODE, PERCENTAGE_CHARGE },
} = FIELD_IDS;

const {
  exportContract: {
    agent: {
      service: { charge },
    },
  },
} = mockApplicationMinimalBrokerBuyerAndCompany;

describe('api/generate-xlsx/map-application-to-xlsx/map-export-contract/map-agent/map-agent-charge/map-agent-charge-amount', () => {
  describe(`when the charge method is ${FIXED_SUM_AMOUNT}`, () => {
    const mockCharge = {
      ...charge,
      [FIXED_SUM_AMOUNT]: 1234,
      [PERCENTAGE_CHARGE]: null,
    };

    it('should return an array of mapped fields', () => {
      const result = mapAgentChargeAmount(mockCharge, mockCountries);

      const country = getCountryByIsoCode(mockCountries, mockCharge[PAYABLE_COUNTRY_CODE]);

      const currencyValue = formatCurrency(Number(mockCharge[FIXED_SUM_AMOUNT]), mockCharge[FIXED_SUM_CURRENCY_CODE]);

      const expected = [
        xlsxRow(String(FIELDS.AGENT_CHARGES[FIXED_SUM_AMOUNT]), currencyValue),

        xlsxRow(String(FIELDS.AGENT_CHARGES[PAYABLE_COUNTRY_CODE]), country.name),
      ];

      expect(result).toEqual(expected);
    });
  });

  describe(`when the charge method is ${PERCENTAGE_CHARGE}`, () => {
    const mockCharge = {
      ...charge,
      [FIXED_SUM_AMOUNT]: null,
      [PERCENTAGE_CHARGE]: 10,
    };

    it('should return an array of mapped fields', () => {
      const result = mapAgentChargeAmount(mockCharge, mockCountries);

      const country = getCountryByIsoCode(mockCountries, mockCharge[PAYABLE_COUNTRY_CODE]);

      const expected = [
        xlsxRow(String(FIELDS.AGENT_CHARGES[PERCENTAGE_CHARGE]), `${charge[PERCENTAGE_CHARGE]}%`),
        xlsxRow(String(FIELDS.AGENT_CHARGES[PAYABLE_COUNTRY_CODE]), country.name),
      ];

      expect(result).toEqual(expected);
    });
  });

  describe(`when the charge method is NOT ${FIXED_SUM_AMOUNT} or ${PERCENTAGE_CHARGE}`, () => {
    it('should return an empty array', () => {
      const mockCharge = {
        ...charge,
        [FIXED_SUM_AMOUNT]: false,
        [PERCENTAGE_CHARGE]: false,
      };

      const result = mapAgentChargeAmount(mockCharge, mockCountries);

      expect(result).toEqual([]);
    });
  });
});
