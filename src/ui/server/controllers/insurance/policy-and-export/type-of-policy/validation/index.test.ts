import validation from '.';
import { FIELD_IDS } from '../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../content-strings';
import generateValidationErrors from '../../../../../helpers/validation';

const { POLICY_AND_EXPORTS } = FIELD_IDS.INSURANCE;
const FIELD_ID = POLICY_AND_EXPORTS.POLICY_TYPE;

describe('controllers/insurance/policy-and-export/type-of-policy/validation', () => {
  describe(`when ${FIELD_ID} is not provided`, () => {
    it('should return validation error with first policy type field as ID', () => {
      const mockBody = {
        [FIELD_ID]: '',
      };

      const result = validation(mockBody);

      const expected = generateValidationErrors(POLICY_AND_EXPORTS.SINGLE_POLICY_TYPE, ERROR_MESSAGES.INSURANCE.POLICY_AND_EXPORTS[FIELD_ID].IS_EMPTY);

      expect(result).toEqual(expected);
    });
  });

  describe('when there are no validation errors', () => {
    it('should return null', () => {
      const mockBody = {
        [FIELD_ID]: 'Single contract policy',
      };

      const result = validation(mockBody);

      expect(result).toEqual(null);
    });
  });
});
