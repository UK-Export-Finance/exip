import preCreditPeriodRule from './pre-credit-period';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/policy';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import emptyFieldValidation from '../../../../../../shared-validation/empty-field';
import { mockErrors } from '../../../../../../test-mocks';

const { NEED_PRE_CREDIT_PERIOD: FIELD_ID } = POLICY_FIELD_IDS;

const {
  INSURANCE: {
    POLICY: { [FIELD_ID]: ERROR_MESSAGE },
  },
} = ERROR_MESSAGES;

describe('controllers/insurance/policy/pre-credit-period/validation/rules/pre-credit-period', () => {
  const mockBody = {
    [FIELD_ID]: '',
  };

  it('should return the result of emptyFieldValidation', () => {
    const result = preCreditPeriodRule(mockBody, mockErrors);

    const expected = emptyFieldValidation(mockBody, FIELD_ID, ERROR_MESSAGE.IS_EMPTY, mockErrors);

    expect(result).toEqual(expected);
  });
});
