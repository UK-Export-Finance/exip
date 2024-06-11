import mapPreviousCoverWithBuyer from '.';
import { TOTAL_CONTRACT_VALUE } from '../../../../constants';
import FIELD_IDS from '../../../../constants/field-ids/insurance';
import { XLSX } from '../../../../content-strings';
import mapYesNoField from '../../helpers/map-yes-no-field';
import xlsxRow from '../../helpers/xlsx-row';
import { mockApplication } from '../../../../test-mocks';

const {
  ELIGIBILITY: { TOTAL_CONTRACT_VALUE: TOTAL_CONTRACT_VALUE_FIELD_ID },
  YOUR_BUYER: { HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER, PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER },
} = FIELD_IDS;

const { FIELDS } = XLSX;

describe('api/generate-xlsx/map-application-to-xlsx/map-buyer/map-previous-cover-with-buyer', () => {
  describe(`when the total contract value is ${TOTAL_CONTRACT_VALUE.MORE_THAN_250K.VALUE}`, () => {
    it('should return an array of mapped fields', () => {
      const application = {
        ...mockApplication,
        eligibility: {
          ...mockApplication.eligibility,
          [TOTAL_CONTRACT_VALUE_FIELD_ID]: {
            value: TOTAL_CONTRACT_VALUE.MORE_THAN_250K.VALUE,
          },
        },
      };

      const {
        eligibility,
        buyer: { relationship },
      } = application;

      const result = mapPreviousCoverWithBuyer(eligibility, relationship);

      const expected = [
        xlsxRow(
          String(FIELDS[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]),
          mapYesNoField({
            answer: relationship[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER],
          }),
        ),
        xlsxRow(String(FIELDS[PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]), relationship[PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]),
      ];

      expect(result).toEqual(expected);
    });
  });

  describe(`when the total contract value is NOT ${TOTAL_CONTRACT_VALUE.MORE_THAN_250K.VALUE}`, () => {
    it('should return an empty array', () => {
      const application = {
        ...mockApplication,
        eligibility: {
          ...mockApplication.eligibility,
          [TOTAL_CONTRACT_VALUE_FIELD_ID]: {
            value: TOTAL_CONTRACT_VALUE.LESS_THAN_250K.VALUE,
          },
        },
      };

      const {
        eligibility,
        buyer: { relationship },
      } = application;

      const result = mapPreviousCoverWithBuyer(eligibility, relationship);

      expect(result).toEqual([]);
    });
  });
});
