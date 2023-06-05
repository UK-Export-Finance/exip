import rule from './currency';
import { FIELD_IDS, GBP_CURRENCY_CODE } from '../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../content-strings';
import generateValidationErrors from '../../../../../helpers/validation';

const { CURRENCY } = FIELD_IDS.ELIGIBILITY;

describe('controllers/quote/tell-us-about-your-policy/validation/rules/currency', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  describe(`when ${CURRENCY} is not provided`, () => {
    it('should return validation error', () => {
      const mockSubmittedData = {
        [CURRENCY]: '',
      };

      const result = rule(mockSubmittedData, mockErrors);

      const expected = generateValidationErrors(CURRENCY, ERROR_MESSAGES.ELIGIBILITY[CURRENCY].IS_EMPTY, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when there are no validation errors', () => {
    it('should return the already provided errors', () => {
      const mockSubmittedData = {
        [CURRENCY]: GBP_CURRENCY_CODE,
      };

      const result = rule(mockSubmittedData, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });
});
