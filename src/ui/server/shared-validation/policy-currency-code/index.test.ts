import policyCurrencyCodeRules from '.';
import INSURANCE_FIELD_IDS from '../../constants/field-ids/insurance';
import { ERROR_MESSAGES } from '../../content-strings';
import emptyFieldValidation from '../empty-field';
import { mockErrors } from '../../test-mocks';

const {
  CURRENCY: { CURRENCY_CODE: FIELD_ID },
} = INSURANCE_FIELD_IDS;

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

  it('should return the result of emptyFieldValidation', () => {
    const result = policyCurrencyCodeRules(mockBody, mockErrors);

    const expected = emptyFieldValidation(mockBody, FIELD_ID, ERROR_MESSAGE.IS_EMPTY, mockErrors);

    expect(result).toEqual(expected);
  });
});
