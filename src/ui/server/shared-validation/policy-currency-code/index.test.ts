import policyCurrencyCodeRules from '.';
import { FIELD_IDS } from '../../constants';
import { ERROR_MESSAGES } from '../../content-strings';
import emptyFieldValidation from '../empty-field';

const {
  INSURANCE: {
    POLICY: {
      CONTRACT_POLICY: { POLICY_CURRENCY_CODE: FIELD_ID },
    },
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    POLICY: {
      CONTRACT_POLICY: { [FIELD_ID]: ERROR_MESSAGE },
    },
  },
} = ERROR_MESSAGES;

describe('shared-validation/policy-currency-code', () => {
  const mockBody = {
    [FIELD_ID]: '',
  };

  const mockErrors = {
    summary: [],
    errorList: {},
  };

  it('should return the result of emptyFieldValidation', () => {
    const result = policyCurrencyCodeRules(mockBody, mockErrors);

    const expected = emptyFieldValidation(mockBody, FIELD_ID, ERROR_MESSAGE.IS_EMPTY, mockErrors);

    expect(result).toEqual(expected);
  });
});
