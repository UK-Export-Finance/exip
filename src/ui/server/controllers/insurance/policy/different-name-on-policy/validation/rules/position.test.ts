import position from './position';
import { MAXIMUM_CHARACTERS } from '../../../../../../constants';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/policy';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import alphaCharactersAndMaxLengthValidation from '../../../../../../shared-validation/alpha-characters-and-max-length';
import { RequestBody } from '../../../../../../../types';
import { mockErrors } from '../../../../../../test-mocks';

const {
  DIFFERENT_NAME_ON_POLICY: { POSITION: FIELD_ID },
} = FIELD_IDS;

const {
  DIFFERENT_NAME_ON_POLICY: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
} = ERROR_MESSAGES.INSURANCE.POLICY;

describe('controllers/insurance/policy/different-name-on-policy/validation/rules/position', () => {
  const mockBody: RequestBody = {
    [FIELD_ID]: '',
  };

  it('should return the result of alphaCharactersAndMaxLengthValidation', () => {
    const response = position(mockBody, mockErrors);

    const expected = alphaCharactersAndMaxLengthValidation(
      mockBody,
      FIELD_ID,
      ERROR_MESSAGES_OBJECT,
      mockErrors,
      MAXIMUM_CHARACTERS.DIFFERENT_NAME_ON_POLICY_POSITION,
    );

    expect(response).toEqual(expected);
  });
});
