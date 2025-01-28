import cannotAdhereToAllRequirementsRules from '.';
import { MAXIMUM_CHARACTERS } from '../../../../../../../../constants';
import DECLARATIONS_FIELD_IDS from '../../../../../../../../constants/field-ids/insurance/declarations';
import { ERROR_MESSAGES } from '../../../../../../../../content-strings';
import providedAndMaxLength from '../../../../../../../../shared-validation/provided-and-max-length';
import { mockErrors } from '../../../../../../../../test-mocks';

const {
  WILL_ADHERE_TO_ALL_REQUIREMENTS,
  CONDITIONAL_REASONS: { CANNOT_ADHERE_TO_ALL_REQUIREMENTS: FIELD_ID },
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

describe('controllers/insurance/declarations/modern-slavery/validation/rules/conditional-reasons/cannot-adhere-to-all-requirements', () => {
  describe(`when ${WILL_ADHERE_TO_ALL_REQUIREMENTS} is false`, () => {
    const mockBody = {
      [WILL_ADHERE_TO_ALL_REQUIREMENTS]: 'false',
      [FIELD_ID]: '',
    };

    it('should return the result of providedAndMaxLength', () => {
      const result = cannotAdhereToAllRequirementsRules(mockBody, mockErrors);

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

  describe(`when ${WILL_ADHERE_TO_ALL_REQUIREMENTS} is true`, () => {
    const mockBody = {
      [WILL_ADHERE_TO_ALL_REQUIREMENTS]: 'true',
      [FIELD_ID]: '',
    };

    it('should return the provided errors', () => {
      const result = cannotAdhereToAllRequirementsRules(mockBody, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });
});
