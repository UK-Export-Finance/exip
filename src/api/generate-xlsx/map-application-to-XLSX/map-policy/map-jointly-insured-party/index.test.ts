import mapJointlyInsuredParty from '.';
import FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import { XLSX } from '../../../../content-strings';
import xlsxRow from '../../helpers/xlsx-row';
import mapYesNoField from '../../helpers/map-yes-no-field';
import getCountryByIsoCode from '../../../../helpers/get-country-by-iso-code';
import { mockApplication, mockCountries } from '../../../../test-mocks';

const { FIELDS } = XLSX;

const {
  REQUESTED_JOINTLY_INSURED_PARTY: { REQUESTED, COMPANY_NAME, COMPANY_NUMBER, COUNTRY_CODE },
} = FIELD_IDS;

describe('api/generate-xlsx/map-application-to-xlsx/map-jointly-insured-party', () => {
  describe(`when ${REQUESTED} is true`, () => {
    it('should return an array of mapped fields', () => {
      const mockParty = {
        ...mockApplication.policy.jointlyInsuredParty,
        [COUNTRY_CODE]: mockCountries[0].isoCode,
        [REQUESTED]: true,
      };

      const result = mapJointlyInsuredParty(mockParty, mockCountries);

      const country = getCountryByIsoCode(mockCountries, mockParty[COUNTRY_CODE]);

      const expected = [
        xlsxRow(String(FIELDS.JOINTLY_INSURED_PARTY[REQUESTED]), mapYesNoField({ answer: mockParty[REQUESTED] })),
        xlsxRow(String(FIELDS.JOINTLY_INSURED_PARTY[COMPANY_NAME]), mockParty[COMPANY_NAME]),
        xlsxRow(String(FIELDS.JOINTLY_INSURED_PARTY[COUNTRY_CODE]), country.name),
        xlsxRow(String(FIELDS.JOINTLY_INSURED_PARTY[COMPANY_NUMBER]), mockParty[COMPANY_NUMBER]),
      ];

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${REQUESTED} is false`, () => {
    it('should return an array with one mapped field', () => {
      const mockParty = {
        ...mockApplication.policy.jointlyInsuredParty,
        [REQUESTED]: false,
      };

      const result = mapJointlyInsuredParty(mockParty, mockCountries);

      const expected = [xlsxRow(String(FIELDS.JOINTLY_INSURED_PARTY[REQUESTED]), mapYesNoField({ answer: mockParty[REQUESTED] }))];

      expect(result).toEqual(expected);
    });
  });
});
