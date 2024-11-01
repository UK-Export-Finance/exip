import lastNameRules from './last-name';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/account';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import nameValidation from '../../../../../../../shared-validation/name';
import { mockErrors } from '../../../../../../../test-mocks';

const { LAST_NAME: FIELD_ID } = FIELD_IDS;

const {
  ACCOUNT: {
    CREATE: {
      YOUR_DETAILS: { [FIELD_ID]: ERROR_MESSAGE },
    },
  },
} = ERROR_MESSAGES.INSURANCE;

describe('controllers/insurance/account/create/your-details/validation/rules/last-name', () => {
  it('should return the result of nameValidation', () => {
    const mockFormBody = {};
    const result = lastNameRules(mockFormBody, mockErrors);

    const expected = nameValidation(mockFormBody, FIELD_ID, ERROR_MESSAGE, mockErrors);

    expect(result).toEqual(expected);
  });
});
