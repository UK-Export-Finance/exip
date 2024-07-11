import paymentTermsDescription from './payment-terms-description';
import { MAXIMUM_CHARACTERS } from '../../../../../../constants';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/export-contract';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import providedAndMaxLength from '../../../../../../shared-validation/provided-and-max-length';
import { mockErrors } from '../../../../../../test-mocks';

const {
  HOW_WILL_YOU_GET_PAID: { PAYMENT_TERMS_DESCRIPTION: FIELD_ID },
} = FIELD_IDS;

const {
  EXPORT_CONTRACT: {
    HOW_WILL_YOU_GET_PAID: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
  },
} = ERROR_MESSAGES.INSURANCE;

describe('controllers/insurance/export-contract/how-will-you-get-paid/validation/rules/payment-terms-description', () => {
  const mockBody = {};

  it('should return the result of providedAndMaxLength', () => {
    const result = paymentTermsDescription(mockBody, mockErrors);

    const expected = providedAndMaxLength(mockBody, FIELD_ID, ERROR_MESSAGES_OBJECT, mockErrors, MAXIMUM_CHARACTERS.PAYMENT_TERMS_DESCRIPTION);

    expect(result).toEqual(expected);
  });
});
