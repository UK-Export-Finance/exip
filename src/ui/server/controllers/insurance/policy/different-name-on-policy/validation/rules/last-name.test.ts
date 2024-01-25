import lastName from './last-name';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/account';
import { RequestBody } from '../../../../../../../types';
import nameValidation from '../../../../../../shared-validation/name';

const { LAST_NAME: FIELD_ID } = FIELD_IDS;

const {
  DIFFERENT_NAME_ON_POLICY: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
} = ERROR_MESSAGES.INSURANCE.POLICY;

describe('controllers/insurance/policy/different-name-on-policy/validation/rules/last-name', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  const mockBody = {
    [FIELD_ID]: '',
  } as RequestBody;

  it('should return the result of nameValidation', () => {
    const result = lastName(mockBody, mockErrors);

    const expected = nameValidation(mockBody, FIELD_ID, ERROR_MESSAGES_OBJECT, mockErrors);

    expect(result).toEqual(expected);
  });
});
