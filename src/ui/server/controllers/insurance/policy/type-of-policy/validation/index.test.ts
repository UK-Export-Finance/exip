import validation from '.';
import { FIELD_IDS, FIELD_VALUES } from '../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../content-strings';
import generateValidationErrors from '../../../../../helpers/validation';

const { POLICY } = FIELD_IDS.INSURANCE;
const FIELD_ID = POLICY.POLICY_TYPE;

const ERROR_MESSAGE = ERROR_MESSAGES.INSURANCE.POLICY.TYPE_OF_POLICY[FIELD_ID].IS_EMPTY;

describe('controllers/insurance/policy/type-of-policy/validation', () => {
  describe(`when ${FIELD_ID} is not provided`, () => {
    it('should return a validation error with first policy type field as ID', () => {
      const mockBody = {
        [FIELD_ID]: '',
      };

      const result = validation(mockBody);

      const expected = generateValidationErrors(POLICY.SINGLE_POLICY_TYPE, ERROR_MESSAGE);

      expect(result).toEqual(expected);
    });
  });

  describe('when a value is not a valid policy type', () => {
    it('should return the result of emptyFieldValidation', () => {
      const mockBody = {
        [FIELD_ID]: 'random-string',
      };

      const result = validation(mockBody);

      const expected = generateValidationErrors(POLICY.SINGLE_POLICY_TYPE, ERROR_MESSAGE);

      expect(result).toEqual(expected);
    });
  });

  describe('when there are no validation errors', () => {
    it('should return an empty object', () => {
      const mockBody = {
        [FIELD_ID]: FIELD_VALUES.POLICY_TYPE.SINGLE,
      };

      const result = validation(mockBody);

      expect(result).toEqual({});
    });
  });
});
