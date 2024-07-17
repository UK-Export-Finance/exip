import mapPreviousCoverWithBuyer from '.';
import FIELD_IDS from '../../../../constants/field-ids/insurance/your-buyer';
import { XLSX } from '../../../../content-strings';
import mapYesNoField from '../../helpers/map-yes-no-field';
import xlsxRow from '../../helpers/xlsx-row';
import { mockApplication, mockApplicationSinglePolicyTotalContractValueOverThreshold } from '../../../../test-mocks';

const { HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER, PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER } = FIELD_IDS;

const { FIELDS } = XLSX;

const {
  buyer: { relationship },
} = mockApplicationSinglePolicyTotalContractValueOverThreshold;

describe('api/generate-xlsx/map-application-to-xlsx/map-buyer/map-previous-cover-with-buyer', () => {
  describe('when the total contract value is over the threshold', () => {
    describe(`${HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER} is true`, () => {
      it(`should return an array of mapped fields with ${HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER}`, () => {
        const mockRelationship = {
          ...relationship,
          [HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]: true,
        };

        const application = mockApplicationSinglePolicyTotalContractValueOverThreshold;

        application.buyer.relationship = mockRelationship;

        const result = mapPreviousCoverWithBuyer(application);

        const expected = [
          xlsxRow(
            String(FIELDS[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]),
            mapYesNoField({
              answer: mockRelationship[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER],
            }),
          ),
          xlsxRow(String(FIELDS[PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]), mockRelationship[PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]),
        ];

        expect(result).toEqual(expected);
      });
    });

    describe(`${HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER} is false`, () => {
      it(`should return an array of mapped fields without ${HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER}`, () => {
        const mockRelationship = {
          ...relationship,
          exporterHasPreviousCreditInsuranceWithBuyer: false,
        };

        const application = mockApplicationSinglePolicyTotalContractValueOverThreshold;

        application.buyer.relationship = mockRelationship;

        const result = mapPreviousCoverWithBuyer(application);

        const expected = [
          xlsxRow(
            String(FIELDS[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]),
            mapYesNoField({
              answer: mockRelationship[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER],
            }),
          ),
        ];

        expect(result).toEqual(expected);
      });
    });
  });

  describe('when the total contract value is NOT over the threshold', () => {
    it('should return an empty array', () => {
      const result = mapPreviousCoverWithBuyer(mockApplication);

      expect(result).toEqual([]);
    });
  });
});
