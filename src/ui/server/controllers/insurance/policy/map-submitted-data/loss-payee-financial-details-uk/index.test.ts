import POLICY_FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';
import mapSubmittedData from '.';
import stripHyphensAndSpacesFromString from '../../../../../helpers/strip-hyphens-and-spaces-from-string';

const {
  LOSS_PAYEE_FINANCIAL_UK: { SORT_CODE },
} = POLICY_FIELD_IDS;

describe('controllers/insurance/policy/map-submitted-data/loss-payee-financial-details-uk', () => {
  describe(`when form body ${SORT_CODE} is provided`, () => {
    const mockBody = {
      [SORT_CODE]: '12-34-56',
    };

    it(`should return mockBody with ${SORT_CODE} mapped through stripHyphensAndSpacesFromString`, () => {
      const result = mapSubmittedData(mockBody);

      const expected = {
        [SORT_CODE]: stripHyphensAndSpacesFromString(mockBody[SORT_CODE]),
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when form body ${SORT_CODE} is NOT provided`, () => {
    it('should return form data as provided', () => {
      const mockBody = {};

      const result = mapSubmittedData(mockBody);

      expect(result).toEqual(mockBody);
    });
  });
});
