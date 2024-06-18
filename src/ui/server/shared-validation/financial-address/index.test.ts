import financialAddress from '.';
import FIELD_IDS from '../../constants/field-ids/insurance/policy';
import { ERROR_MESSAGES } from '../../content-strings';
import fullAddressValidation from '../full-address';
import { mockErrors } from '../../test-mocks';

const { FINANCIAL_ADDRESS: FIELD_ID } = FIELD_IDS;

const { [FIELD_ID]: ERROR_MESSAGES_OBJECT } = ERROR_MESSAGES.INSURANCE.POLICY;

describe('shared-validation/financial-address', () => {
  const mockBody = {};

  it('should return the result of fullAddressValidation', () => {
    const response = financialAddress(mockBody, mockErrors);

    const expected = fullAddressValidation(mockBody, FIELD_ID, ERROR_MESSAGES_OBJECT, mockErrors);

    expect(response).toEqual(expected);
  });
});
