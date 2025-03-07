import passwordRules from './password';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/account';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import passwordValidation from '../../../../../../../shared-validation/password';
import { mockErrors } from '../../../../../../../test-mocks';
import { RequestBody } from '../../../../../../../../types';

const { PASSWORD: FIELD_ID } = FIELD_IDS;

const {
  ACCOUNT: {
    CREATE: {
      YOUR_DETAILS: { [FIELD_ID]: ERROR_MESSAGE },
    },
  },
} = ERROR_MESSAGES.INSURANCE;

describe('controllers/insurance/account/create/your-details/validation/rules/password', () => {
  it('should return the result of passwordValidation', () => {
    const mockFormBody = {} as RequestBody;

    const result = passwordRules(mockFormBody, mockErrors);

    const expected = passwordValidation(FIELD_ID, mockFormBody[FIELD_ID], ERROR_MESSAGE.INCORRECT_FORMAT, mockErrors);

    expect(result).toEqual(expected);
  });
});
