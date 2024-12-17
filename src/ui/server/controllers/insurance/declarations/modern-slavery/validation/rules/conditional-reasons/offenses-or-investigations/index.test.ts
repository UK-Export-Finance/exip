import offensesOrInvestigationsRules from '.';
import { MAXIMUM_CHARACTERS } from '../../../../../../../../constants';
import DECLARATIONS_FIELD_IDS from '../../../../../../../../constants/field-ids/insurance/declarations';
import { ERROR_MESSAGES } from '../../../../../../../../content-strings';
import providedAndMaxLength from '../../../../../../../../shared-validation/provided-and-max-length';
import { mockErrors } from '../../../../../../../../test-mocks';

const {
  HAS_NO_OFFENSES_OR_INVESTIGATIONS,
  CONDITIONAL_REASONS: { OFFENSES_OR_INVESTIGATIONS: FIELD_ID },
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

describe('controllers/insurance/declarations/modern-slavery/validation/rules/conditional-reasons/offenses-or-investigations', () => {
  describe(`when ${HAS_NO_OFFENSES_OR_INVESTIGATIONS} is false`, () => {
    const mockBody = {
      [HAS_NO_OFFENSES_OR_INVESTIGATIONS]: 'false',
      [FIELD_ID]: '',
    };

    it('should return the result of providedAndMaxLength', () => {
      const result = offensesOrInvestigationsRules(mockBody, mockErrors);

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

  describe(`when ${HAS_NO_OFFENSES_OR_INVESTIGATIONS} is true`, () => {
    const mockBody = {
      [HAS_NO_OFFENSES_OR_INVESTIGATIONS]: 'true',
      [FIELD_ID]: '',
    };

    it('should return the provided errors', () => {
      const result = offensesOrInvestigationsRules(mockBody, mockErrors);

      expect(result).toEqual(mockErrors);
    });
  });
});
