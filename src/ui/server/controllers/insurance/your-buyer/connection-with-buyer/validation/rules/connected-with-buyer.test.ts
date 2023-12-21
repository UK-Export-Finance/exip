import connectedWithBuyerRule from './connected-with-buyer';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/your-buyer';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import emptyFieldValidation from '../../../../../../shared-validation/empty-field';
import { RequestBody } from '../../../../../../../types';

const {
  WORKING_WITH_BUYER: { CONNECTION_WITH_BUYER: FIELD_ID },
} = FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: {
      WORKING_WITH_BUYER: { [FIELD_ID]: ERROR_MESSAGE },
    },
  },
} = ERROR_MESSAGES;

describe('controllers/insurance/your-buyer/connection-with-buyer/validation/connected-with-buyer', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  const mockBody = {
    [FIELD_ID]: '',
  } as RequestBody;

  it('should return `emptyFieldValidation`', () => {
    const result = connectedWithBuyerRule(mockBody, mockErrors);

    const expected = emptyFieldValidation(mockBody, FIELD_ID, ERROR_MESSAGE.IS_EMPTY, mockErrors);

    expect(result).toEqual(expected);
  });
});
