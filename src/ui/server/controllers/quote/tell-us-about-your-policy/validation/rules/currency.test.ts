import rule from './currency';
import { FIELD_IDS, GBP_CURRENCY_CODE } from '../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../content-strings';
import generateValidationErrors from '../../../../../helpers/validation';

describe('controllers/quote/tell-us-about-your-policy/validation/rules/currency', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  describe(`when ${FIELD_IDS.CURRENCY} is not provided`, () => {
    it('should return validation error', () => {
      const mockSubmittedData = {
        [FIELD_IDS.CURRENCY]: '',
      };

      const result = rule(mockSubmittedData, mockErrors);

      const expected = generateValidationErrors(FIELD_IDS.CURRENCY, ERROR_MESSAGES[FIELD_IDS.CURRENCY].IS_EMPTY, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when there are no validation errors', () => {
    it('should return the already provided errors', () => {
      const mockSubmittedData = {
        [FIELD_IDS.CURRENCY]: GBP_CURRENCY_CODE,
      };

      const result = rule(mockSubmittedData, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });
});
