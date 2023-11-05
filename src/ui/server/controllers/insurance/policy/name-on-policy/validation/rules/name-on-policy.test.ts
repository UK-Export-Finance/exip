import nameOnPolicyRule from './name-on-policy';
import { FIELD_IDS } from '../../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import emptyFieldValidation from '../../../../../../shared-validation/empty-field';

const {
  POLICY: {
    NAME_ON_POLICY: { NAME: FIELD_ID },
  },
} = FIELD_IDS.INSURANCE;

const {
  INSURANCE: {
    POLICY: {
      NAME_ON_POLICY: { [FIELD_ID]: ERROR_MESSAGE },
    },
  },
} = ERROR_MESSAGES;

describe('controllers/insurance/policy/name-on-policy/validation/rules/name-on-policy', () => {
  const mockBody = {
    [FIELD_ID]: '',
  };

  const mockErrors = {
    summary: [],
    errorList: {},
  };

  it('should return the result of emptyFieldValidation', () => {
    const result = nameOnPolicyRule(mockBody, mockErrors);

    const expected = emptyFieldValidation(mockBody, FIELD_ID, ERROR_MESSAGE.IS_EMPTY, mockErrors);

    expect(result).toEqual(expected);
  });
});
