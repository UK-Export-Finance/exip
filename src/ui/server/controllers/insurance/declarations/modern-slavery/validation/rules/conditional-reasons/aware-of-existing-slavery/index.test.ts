import awareOfExistingSlaveryRules from '.';
import { MAXIMUM_CHARACTERS } from '../../../../../../../../constants';
import DECLARATIONS_FIELD_IDS from '../../../../../../../../constants/field-ids/insurance/declarations';
import { ERROR_MESSAGES } from '../../../../../../../../content-strings';
import providedAndMaxLength from '../../../../../../../../shared-validation/provided-and-max-length';
import { mockErrors } from '../../../../../../../../test-mocks';

const {
  IS_NOT_AWARE_OF_EXISTING_SLAVERY,
  CONDITIONAL_REASONS: { AWARE_OF_EXISTING_SLAVERY: FIELD_ID },
} = DECLARATIONS_FIELD_IDS.MODERN_SLAVERY;

const {
  INSURANCE: {
    DECLARATIONS: {
      MODERN_SLAVERY: {
        CONDITIONAL_REASONS: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
      },
    },
  },
} = ERROR_MESSAGES;

describe('controllers/insurance/declarations/modern-slavery/validation/rules/conditional-reasons/aware-of-existing-slavery', () => {
  describe(`when ${IS_NOT_AWARE_OF_EXISTING_SLAVERY} is false`, () => {
    const mockBody = {
      [IS_NOT_AWARE_OF_EXISTING_SLAVERY]: 'false',
      [FIELD_ID]: '',
    };

    it('should return the result of providedAndMaxLength', () => {
      const result = awareOfExistingSlaveryRules(mockBody, mockErrors);

      const expected = providedAndMaxLength(
        mockBody,
        FIELD_ID,
        ERROR_MESSAGES_OBJECT,
        mockErrors,
        MAXIMUM_CHARACTERS.DECLARATIONS.MODERN_SLAVERY.CONDITIONAL_REASON,
      );

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${IS_NOT_AWARE_OF_EXISTING_SLAVERY} is true`, () => {
    const mockBody = {
      [IS_NOT_AWARE_OF_EXISTING_SLAVERY]: 'true',
      [FIELD_ID]: '',
    };

    it('should return the provided errors', () => {
      const result = awareOfExistingSlaveryRules(mockBody, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });
});
