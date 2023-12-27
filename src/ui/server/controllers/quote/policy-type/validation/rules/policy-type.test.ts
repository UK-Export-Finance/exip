import rule from './policy-type';
import { FIELD_IDS } from '../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../content-strings';
import emptyFieldValidation from '../../../../../shared-validation/empty-field';

const { POLICY_TYPE: FIELD_ID, SINGLE_POLICY_TYPE } = FIELD_IDS;
const ERROR_MESSAGE = ERROR_MESSAGES.ELIGIBILITY[FIELD_ID];

describe('controllers/quote/policy-type/validation/rules/policy-type', () => {
  const mockBody = {
    [FIELD_ID]: '',
  };

  const mockErrors = {
    summary: [],
    errorList: {},
  };

  describe('when a value is not a valid policy type', () => {
    it('should return the result of emptyFieldValidation', () => {
      mockBody[FIELD_ID] = 'random-string';

      const result = rule(mockBody, mockErrors);

      const expected = emptyFieldValidation({}, SINGLE_POLICY_TYPE, ERROR_MESSAGE, mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when a value is not provided', () => {
    it('should return the result of emptyFieldValidation', () => {
      mockBody[FIELD_ID] = '';

      const result = rule(mockBody, mockErrors);

      const expected = emptyFieldValidation(mockBody, SINGLE_POLICY_TYPE, ERROR_MESSAGE, mockErrors);

      expect(result).toEqual(expected);
    });
  });
});
