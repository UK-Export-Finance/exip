import addressRules from './address';
import { FIELD_IDS } from '../../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import fullAddress from '../../../../../../shared-validation/full-address';
import { mockErrors } from '../../../../../../test-mocks';

const {
  YOUR_BUYER: {
    COMPANY_OR_ORGANISATION: { ADDRESS: FIELD_ID },
  },
} = FIELD_IDS.INSURANCE;

const {
  INSURANCE: {
    YOUR_BUYER: {
      COMPANY_OR_ORGANISATION: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
    },
  },
} = ERROR_MESSAGES;

describe('controllers/insurance/your-buyer/validation/address', () => {
  it('should return the result of fullAddress', () => {
    const mockBody = {
      [FIELD_ID]: '',
    };

    const result = addressRules(mockBody, mockErrors);

    const expected = fullAddress(mockBody, FIELD_ID, ERROR_MESSAGES_OBJECT, mockErrors);

    expect(result).toEqual(expected);
  });
});
