import mapJointlyInsuredParty from '.';
import FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import { XLSX } from '../../../../content-strings';
import { POLICY_FIELDS } from '../../../../content-strings/fields/insurance/policy';
import xlsxRow from '../../helpers/xlsx-row';
import mapYesNoField from '../../helpers/map-yes-no-field';
import { mockApplication } from '../../../../test-mocks';

const { FIELDS } = XLSX;

const CONTENT_STRINGS = POLICY_FIELDS.REQUESTED_JOINTLY_INSURED_PARTY;

const {
  REQUESTED_JOINTLY_INSURED_PARTY: { REQUESTED, COMPANY_NAME, COMPANY_NUMBER, COUNTRY_CODE },
} = FIELD_IDS;

describe('api/generate-xlsx/map-application-to-xlsx/map-jointly-insured-party', () => {
  describe(`when ${REQUESTED} is true`, () => {
    it('should return an array of mapped fields', () => {
      const mockParty = {
        ...mockApplication.policy.jointlyInsuredParty,
        [REQUESTED]: true,
      };

      const result = mapJointlyInsuredParty(mockParty);

      const expected = [
        xlsxRow(String(FIELDS.JOINTLY_INSURED_PARTY[REQUESTED]), mapYesNoField({ answer: mockParty[REQUESTED] })),
        xlsxRow(String(FIELDS.JOINTLY_INSURED_PARTY[COMPANY_NAME]), mockParty[COMPANY_NAME]),
        xlsxRow(String(FIELDS.JOINTLY_INSURED_PARTY[COUNTRY_CODE]), mockParty[COUNTRY_CODE]),
        xlsxRow(String(CONTENT_STRINGS[COMPANY_NUMBER].SUMMARY?.TITLE), mockParty[COMPANY_NUMBER]),
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

      const result = mapJointlyInsuredParty(mockParty);

      const expected = [xlsxRow(String(FIELDS.JOINTLY_INSURED_PARTY[REQUESTED]), mapYesNoField({ answer: mockParty[REQUESTED] }))];

      expect(result).toEqual(expected);
    });
  });
});
