import rule from './percentage-of-cover';
import { FIELD_IDS } from '../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../content-strings';
import generateValidationErrors from '../../../../../helpers/validation';

describe('controllers/tell-us-about-your-policy/validation/rules/percentage-of-cover', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  describe(`when ${FIELD_IDS.PERCENTAGE_OF_COVER} is not provided`, () => {
    it('should return validation error', () => {
      const mockSubmittedData = {
        [FIELD_IDS.PERCENTAGE_OF_COVER]: '',
      };

      const result = rule(mockSubmittedData, mockErrors);

      const expected = generateValidationErrors(FIELD_IDS.PERCENTAGE_OF_COVER, ERROR_MESSAGES[FIELD_IDS.PERCENTAGE_OF_COVER].IS_EMPTY, mockErrors);

      expect(result).toEqual(expected);
    });
  });
});
