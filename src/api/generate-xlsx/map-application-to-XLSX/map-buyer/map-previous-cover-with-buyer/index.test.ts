import mapPreviousCoverWithBuyer from '.';
import { TOTAL_CONTRACT_VALUE } from '../../../../constants/total-contract-value';
import FIELD_IDS from '../../../../constants/field-ids/insurance/your-buyer';
import { XLSX } from '../../../../content-strings';
import mapYesNoField from '../../helpers/map-yes-no-field';
import xlsxRow from '../../helpers/xlsx-row';
import { mockApplication, mockApplicationSinglePolicyTotalContractValueOverThreshold } from '../../../../test-mocks';

const {
  HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER, PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER,
} = FIELD_IDS;

const { FIELDS } = XLSX;

describe('api/generate-xlsx/map-application-to-xlsx/map-buyer/map-previous-cover-with-buyer', () => {
  describe(`when the total contract value is ${TOTAL_CONTRACT_VALUE.MORE_THAN_250K.VALUE}`, () => {
    it('should return an array of mapped fields', () => {
      const {
        eligibility,
        buyer: { relationship },
      } = mockApplicationSinglePolicyTotalContractValueOverThreshold;

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
      const {
        eligibility,
        buyer: { relationship },
      } = mockApplication;

      const result = mapPreviousCoverWithBuyer(eligibility, relationship);

      expect(result).toEqual([]);
    });
  });
});
