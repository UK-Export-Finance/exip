import location from './location';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/policy';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import emptyFieldValidation from '../../../../../../shared-validation/empty-field';
import { RequestBody } from '../../../../../../../types';
import { mockErrors } from '../../../../../../test-mocks';

const {
  LOSS_PAYEE_DETAILS: { LOCATION: FIELD_ID },
} = FIELD_IDS;

const { [FIELD_ID]: ERROR_MESSAGES_OBJECT } = ERROR_MESSAGES.INSURANCE.POLICY;

describe('controllers/insurance/policy/loss-payee-details/validation/rules/location', () => {
  const mockBody = {
    [FIELD_ID]: '',
  } as RequestBody;

  it('should return the result of emptyFieldValidation', () => {
    const response = location(mockBody, mockErrors);

    const expected = emptyFieldValidation(mockBody, FIELD_ID, ERROR_MESSAGES_OBJECT.IS_EMPTY, mockErrors);

    expect(response).toEqual(expected);
  });
});
