import failedPaymentsRule from './failed-payments';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/your-buyer';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import emptyFieldValidation from '../../../../../../shared-validation/empty-field';
import { RequestBody } from '../../../../../../../types';
import { mockErrors } from '../../../../../../test-mocks';

const { FAILED_PAYMENTS: FIELD_ID } = FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: { [FIELD_ID]: ERROR_MESSAGE },
  },
} = ERROR_MESSAGES;

describe('controllers/insurance/your-buyer/trading-history/validation/rules/failed-payments', () => {
  const mockBody = {
    [FIELD_ID]: '',
  } as RequestBody;

  it('should return `emptyFieldValidation`', () => {
    const result = failedPaymentsRule(mockBody, mockErrors);

    const expected = emptyFieldValidation(mockBody, FIELD_ID, ERROR_MESSAGE.IS_EMPTY, mockErrors);

    expect(result).toEqual(expected);
  });
});
