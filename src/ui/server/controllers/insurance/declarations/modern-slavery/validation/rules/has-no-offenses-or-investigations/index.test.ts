import hasNoOffensesOrInvestigationsRule from '.';
import DECLARATIONS_FIELD_IDS from '../../../../../../../constants/field-ids/insurance/declarations';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import emptyFieldValidation from '../../../../../../../shared-validation/empty-field';
import { mockErrors } from '../../../../../../../test-mocks';

const { HAS_NO_OFFENSES_OR_INVESTIGATIONS: FIELD_ID } = DECLARATIONS_FIELD_IDS.MODERN_SLAVERY;

const {
  INSURANCE: {
    DECLARATIONS: {
      MODERN_SLAVERY: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
    },
  },
} = ERROR_MESSAGES;

describe('controllers/insurance/declarations/modern-slavery/validation/rules/has-no-offenses-or-investigations', () => {
  it('should return the result of emptyFieldValidation', () => {
    const mockFormBody = {
      [FIELD_ID]: 'true',
    };

    const result = hasNoOffensesOrInvestigationsRule(mockFormBody, mockErrors);

    const expected = emptyFieldValidation(mockFormBody, FIELD_ID, ERROR_MESSAGES_OBJECT.IS_EMPTY, mockErrors);

    expect(result).toEqual(expected);
  });
});
