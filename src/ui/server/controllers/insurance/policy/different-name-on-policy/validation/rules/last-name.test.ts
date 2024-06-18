import lastName from './last-name';
import { MAXIMUM_CHARACTERS } from '../../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/account';
import alphaCharactersAndMaxLengthValidation from '../../../../../../shared-validation/alpha-characters-and-max-length';
import { mockErrors } from '../../../../../../test-mocks';
import { RequestBody } from '../../../../../../../types';

const { LAST_NAME: FIELD_ID } = FIELD_IDS;

const {
  DIFFERENT_NAME_ON_POLICY: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
} = ERROR_MESSAGES.INSURANCE.POLICY;

describe('controllers/insurance/policy/different-name-on-policy/validation/rules/last-name', () => {
  const mockBody = {
    [FIELD_ID]: '',
  } as RequestBody;

  it('should return the result of alphaCharactersAndMaxLengthValidation', () => {
    const result = lastName(mockBody, mockErrors);

    const expected = alphaCharactersAndMaxLengthValidation(mockBody, FIELD_ID, ERROR_MESSAGES_OBJECT, mockErrors, MAXIMUM_CHARACTERS.POLICY_CONTACT_NAME);

    expect(result).toEqual(expected);
  });
});
