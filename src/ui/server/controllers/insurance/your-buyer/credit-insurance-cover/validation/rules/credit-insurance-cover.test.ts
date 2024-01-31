import creditInsuranceCoverRule from './credit-insurance-cover';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/your-buyer';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import emptyFieldValidation from '../../../../../../shared-validation/empty-field';
import { RequestBody } from '../../../../../../../types';
import { mockErrors } from '../../../../../../test-mocks';

const { HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER: FIELD_ID } = FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: { [FIELD_ID]: ERROR_MESSAGE },
  },
} = ERROR_MESSAGES;

describe('controllers/insurance/your-buyer/credit-insurance-cover/validation/rules/credit-insurance-cover', () => {
  const mockBody = {
    [FIELD_ID]: '',
  } as RequestBody;

  it('should return `emptyFieldValidation`', () => {
    const result = creditInsuranceCoverRule(mockBody, mockErrors);

    const expected = emptyFieldValidation(mockBody, FIELD_ID, ERROR_MESSAGE.IS_EMPTY, mockErrors);

    expect(result).toEqual(expected);
  });
});
