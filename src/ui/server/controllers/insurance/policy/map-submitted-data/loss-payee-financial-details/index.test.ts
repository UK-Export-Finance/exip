import POLICY_FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';
import mapSubmittedData from '.';
import stripHyphensAndSpacesFromString from '../../../../../helpers/strip-hyphens-and-spaces-from-string';

const {
  LOSS_PAYEE_FINANCIAL_UK: { SORT_CODE },
  LOSS_PAYEE_FINANCIAL_INTERNATIONAL: { IBAN, BIC_SWIFT_CODE },
} = POLICY_FIELD_IDS;

describe('controllers/insurance/policy/map-submitted-data/loss-payee-financial-details', () => {
  describe(`when form body ${SORT_CODE} is provided`, () => {
    const mockBody = {
      [SORT_CODE]: '12-34-56',
      [IBAN]: '11-22-33-44-55',
      [BIC_SWIFT_CODE]: 'BKENGB2L 123',
    };

    it(`should return mockBody with ${SORT_CODE}, ${IBAN} and ${BIC_SWIFT_CODE} mapped through stripHyphensAndSpacesFromString`, () => {
      const result = mapSubmittedData(mockBody);

      const expected = {
        [SORT_CODE]: stripHyphensAndSpacesFromString(mockBody[SORT_CODE]),
        [IBAN]: stripHyphensAndSpacesFromString(mockBody[IBAN]),
        [BIC_SWIFT_CODE]: stripHyphensAndSpacesFromString(mockBody[BIC_SWIFT_CODE]),
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when form body ${SORT_CODE}, ${IBAN} and ${BIC_SWIFT_CODE} are NOT provided`, () => {
    it('should return form data as provided', () => {
      const mockBody = {};

      const result = mapSubmittedData(mockBody);

      expect(result).toEqual(mockBody);
    });
  });
});
