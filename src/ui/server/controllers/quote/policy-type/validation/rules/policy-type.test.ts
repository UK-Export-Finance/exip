import rule from './policy-type';
import { FIELD_IDS } from '../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../content-strings';
import generateValidationErrors from '../../../../../helpers/validation';

describe('controllers/quote/policy-type/validation/rules/policy-type', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  describe(`when ${FIELD_IDS.POLICY_TYPE} is not provided`, () => {
    it('should return validation error with first policy type field as ID', () => {
      const mockBody = {
        [FIELD_IDS.POLICY_TYPE]: '',
      };

      const result = rule(mockBody, mockErrors);

      const expected = generateValidationErrors(FIELD_IDS.SINGLE_POLICY_TYPE, ERROR_MESSAGES.ELIGIBILITY[FIELD_IDS.POLICY_TYPE], mockErrors);

      expect(result).toEqual(expected);
    });
  });

  describe('when there are no validation errors', () => {
    it('should return the already provided errors', () => {
      const mockBody = {
        [FIELD_IDS.POLICY_TYPE]: 'single',
      };

      const result = rule(mockBody, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });
});
