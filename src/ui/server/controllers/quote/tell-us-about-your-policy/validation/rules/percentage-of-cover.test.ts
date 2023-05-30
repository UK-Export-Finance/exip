import rule from './percentage-of-cover';
import { FIELD_IDS } from '../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../content-strings';
import generateValidationErrors from '../../../../../helpers/validation';

const {
  ELIGIBILITY: { PERCENTAGE_OF_COVER },
} = FIELD_IDS;

describe('controllers/quote/tell-us-about-your-policy/validation/rules/percentage-of-cover', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  describe(`when ${PERCENTAGE_OF_COVER} is not provided`, () => {
    it('should return validation error', () => {
      const mockSubmittedData = {
        [PERCENTAGE_OF_COVER]: '',
      };

      const result = rule(mockSubmittedData, mockErrors);

      const expected = generateValidationErrors(PERCENTAGE_OF_COVER, ERROR_MESSAGES.ELIGIBILITY[PERCENTAGE_OF_COVER].IS_EMPTY, mockErrors);

      expect(result).toEqual(expected);
    });
  });
});
