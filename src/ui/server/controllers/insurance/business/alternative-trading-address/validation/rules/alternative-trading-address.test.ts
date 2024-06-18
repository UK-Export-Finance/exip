import alternativeTradingAddress from './alternative-trading-address';
import { FIELD_IDS } from '../../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import fullAddress from '../../../../../../shared-validation/full-address';
import { mockErrors } from '../../../../../../test-mocks';

const { FULL_ADDRESS: FIELD_ID } = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.ALTERNATIVE_TRADING_ADDRESS;

const {
  EXPORTER_BUSINESS: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
} = ERROR_MESSAGES.INSURANCE;

describe('controllers/insurance/business/alternative-trading-address/validation/rules/alternative-trading-address', () => {
  const mockBody = {
    [FIELD_ID]: '',
  };

  it('should return the result of fullAddress', () => {
    const result = alternativeTradingAddress(mockBody, mockErrors);

    const expected = fullAddress(mockBody, FIELD_ID, ERROR_MESSAGES_OBJECT, mockErrors);

    expect(result).toEqual(expected);
  });
});
