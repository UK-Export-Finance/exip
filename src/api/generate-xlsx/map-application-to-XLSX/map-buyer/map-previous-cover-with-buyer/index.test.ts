import mapPreviousCoverWithBuyer from '.';
import { TOTAL_CONTRACT_VALUE } from '../../../../constants/total-contract-value';
import FIELD_IDS from '../../../../constants/field-ids/insurance';
import { XLSX } from '../../../../content-strings';
import mapYesNoField from '../../helpers/map-yes-no-field';
import xlsxRow from '../../helpers/xlsx-row';
import { mockApplicationSinglePolicyTotalContractValueOverThreshold, mockApplicationEligibilityTotalContractValueBelowThreshold } from '../../../../test-mocks';

const {
  MIGRATED_FROM_V1_TO_V2,
  YOUR_BUYER: { HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER, PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER },
} = FIELD_IDS;

const { FIELDS } = XLSX;

const {
  buyer: { relationship },
  eligibility,
} = mockApplicationSinglePolicyTotalContractValueOverThreshold;

const mockRelationshipTrue = {
  ...relationship,
  [HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]: true,
};

const mockRelationshipFalse = {
  ...relationship,
  [HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]: false,
};

describe('api/generate-xlsx/map-application-to-xlsx/map-buyer/map-previous-cover-with-buyer', () => {
  describe(`when the total contract value is ${TOTAL_CONTRACT_VALUE.MORE_THAN_250K.VALUE}`, () => {
    describe(`when ${HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER} is true`, () => {
      it(`should return an array of mapped fields with ${HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER}`, () => {
        const result = mapPreviousCoverWithBuyer(eligibility, mockRelationshipTrue, false);

        const expected = [
          xlsxRow(
            String(FIELDS[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]),
            mapYesNoField({
              answer: mockRelationshipTrue[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER],
            }),
          ),
          xlsxRow(String(FIELDS[PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]), mockRelationshipTrue[PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]),
        ];

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER} is false`, () => {
      it('should return an array with one field', () => {
        const result = mapPreviousCoverWithBuyer(eligibility, mockRelationshipFalse, false);

        const expected = [
          xlsxRow(
            String(FIELDS[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]),
            mapYesNoField({
              answer: mockRelationshipFalse[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER],
            }),
          ),
        ];

        expect(result).toEqual(expected);
      });
    });
  });

  describe(`when ${MIGRATED_FROM_V1_TO_V2} is true`, () => {
    describe(`when ${HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER} is true`, () => {
      it(`should return an array of mapped fields with ${HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER}`, () => {
        const result = mapPreviousCoverWithBuyer(mockApplicationEligibilityTotalContractValueBelowThreshold, mockRelationshipTrue, true);

        const expected = [
          xlsxRow(
            String(FIELDS[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]),
            mapYesNoField({
              answer: mockRelationshipTrue[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER],
            }),
          ),
          xlsxRow(String(FIELDS[PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]), mockRelationshipTrue[PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]),
        ];

        expect(result).toEqual(expected);
      });

      describe(`when ${HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER} is false`, () => {
        it('should return an array with one field', () => {
          const result = mapPreviousCoverWithBuyer(mockApplicationEligibilityTotalContractValueBelowThreshold, mockRelationshipFalse, true);

          const expected = [
            xlsxRow(
              String(FIELDS[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]),
              mapYesNoField({
                answer: mockRelationshipFalse[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER],
              }),
            ),
          ];

          expect(result).toEqual(expected);
        });
      });
    });
  });

  describe(`when the total contract value is NOT ${TOTAL_CONTRACT_VALUE.MORE_THAN_250K.VALUE} and ${MIGRATED_FROM_V1_TO_V2} is false`, () => {
    it('should return an empty array', () => {
      const result = mapPreviousCoverWithBuyer(mockApplicationEligibilityTotalContractValueBelowThreshold, relationship, false);

      expect(result).toEqual([]);
    });
  });
});
