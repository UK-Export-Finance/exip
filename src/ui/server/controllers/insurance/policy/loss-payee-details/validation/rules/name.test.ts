import firstName from './name';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/policy';
import nameValidation from '../../../../../../shared-validation/name';
import { RequestBody } from '../../../../../../../types';
import { mockErrors } from '../../../../../../test-mocks';

const {
  LOSS_PAYEE_DETAILS: { NAME: FIELD_ID },
} = FIELD_IDS;

const { [FIELD_ID]: ERROR_MESSAGES_OBJECT } = ERROR_MESSAGES.INSURANCE.POLICY;

describe('controllers/insurance/policy/loss-payee-details/validation/rules/name', () => {
  const mockBody = {
    [FIELD_ID]: '',
  } as RequestBody;

  it('should return the result of nameValidation', () => {
    const result = firstName(mockBody, mockErrors);

    const expected = nameValidation(mockBody, FIELD_ID, ERROR_MESSAGES_OBJECT, mockErrors);

    expect(result).toEqual(expected);
  });
});
