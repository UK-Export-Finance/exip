import lastNameRules from './last-name';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/account';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import emptyFieldValidation from '../../../../../../../shared-validation/empty-field';

const { LAST_NAME: FIELD_ID } = FIELD_IDS;

const {
  ACCOUNT: {
    CREATE: {
      YOUR_DETAILS: { [FIELD_ID]: ERROR_MESSAGE },
    },
  },
} = ERROR_MESSAGES.INSURANCE;

describe('controllers/insurance/account/create/your-details/validation/rules/last-name', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  it('should return the result of emptyFieldValidation', () => {
    const mockFormBody = {};
    const result = lastNameRules(mockFormBody, mockErrors);

    const expected = emptyFieldValidation(mockFormBody, FIELD_ID, ERROR_MESSAGE.IS_EMPTY, mockErrors);

    expect(result).toEqual(expected);
  });
});
