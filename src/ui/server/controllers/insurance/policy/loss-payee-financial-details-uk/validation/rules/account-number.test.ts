import accountNumberRules, { MINIMUM, MAXIMUM } from './account-number';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/policy';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import numberMinimumMaximumLength from '../../../../../../shared-validation/number-minimum-maximum-length';
import { RequestBody } from '../../../../../../../types';
import { mockErrors } from '../../../../../../test-mocks';

const {
  LOSS_PAYEE_FINANCIAL_UK: { ACCOUNT_NUMBER: FIELD_ID },
} = FIELD_IDS;

const { [FIELD_ID]: ERROR_MESSAGES_OBJECT } = ERROR_MESSAGES.INSURANCE.POLICY;

describe('controllers/insurance/policy/loss-payee-financial-details-uk/validation/rules/account-number', () => {
  const mockBody = {
    [FIELD_ID]: '',
  } as RequestBody;

  it('should return the result of numberMinimumMaximumLength', () => {
    const result = accountNumberRules(mockBody, mockErrors);

    const expected = numberMinimumMaximumLength({
      formBody: mockBody,
      fieldId: FIELD_ID,
      errorMessage: ERROR_MESSAGES_OBJECT,
      errors: mockErrors,
      minimum: MINIMUM,
      maximum: MAXIMUM,
    });

    expect(result).toEqual(expected);
  });
});
