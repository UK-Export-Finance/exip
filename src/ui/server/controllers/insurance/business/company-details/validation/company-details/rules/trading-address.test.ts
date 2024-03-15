import tradingAddress from './trading-address';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import INSURANCE_FIELD_IDS from '../../../../../../../constants/field-ids/insurance';
import fullAddress from '../../../../../../../shared-validation/full-address';
import { RequestBody } from '../../../../../../../../types';
import { mockErrors } from '../../../../../../../test-mocks';

const {
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: { TRADING_ADDRESS: FIELD_ID },
  },
} = INSURANCE_FIELD_IDS;

const {
  EXPORTER_BUSINESS: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
} = ERROR_MESSAGES.INSURANCE;

describe('controllers/insurance/business/company-details/validation/company-details/rules/trading-address', () => {
  const mockBody = {
    [FIELD_ID]: '',
  } as RequestBody;

  it('should return the result of fullAddress', () => {
    const result = tradingAddress(mockBody, mockErrors);

    const expected = fullAddress(mockBody, FIELD_ID, ERROR_MESSAGES_OBJECT, mockErrors);

    expect(result).toEqual(expected);
  });
});
