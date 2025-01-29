import willAdhereToAllRequirementsRule from '.';
import DECLARATIONS_FIELD_IDS from '../../../../../../../constants/field-ids/insurance/declarations';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import emptyFieldValidation from '../../../../../../../shared-validation/empty-field';
import { mockErrors } from '../../../../../../../test-mocks';

const { WILL_ADHERE_TO_ALL_REQUIREMENTS: FIELD_ID } = DECLARATIONS_FIELD_IDS.MODERN_SLAVERY;

const {
  INSURANCE: {
    DECLARATIONS: {
      MODERN_SLAVERY: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
    },
  },
} = ERROR_MESSAGES;

describe('controllers/insurance/declarations/modern-slavery/validation/rules/will-adhere-to-all-requirements', () => {
  it('should return the result of emptyFieldValidation', () => {
    const mockFormBody = {
      [FIELD_ID]: 'true',
    };

    const result = willAdhereToAllRequirementsRule(mockFormBody, mockErrors);

    const expected = emptyFieldValidation(mockFormBody, FIELD_ID, ERROR_MESSAGES_OBJECT.IS_EMPTY, mockErrors);

    expect(result).toEqual(expected);
  });
});
