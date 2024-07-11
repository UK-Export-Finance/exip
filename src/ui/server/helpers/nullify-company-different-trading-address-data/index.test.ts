import nullifyCompanyDifferentTradingAddress from '.';
import FIELD_IDS from '../../constants/field-ids/insurance/business';

const {
  ALTERNATIVE_TRADING_ADDRESS: { FULL_ADDRESS },
} = FIELD_IDS;

describe('server/helpers/nullify-agent-service-data', () => {
  it('should return an object with nullified values', () => {
    const result = nullifyCompanyDifferentTradingAddress();

    const expected = {
      [FULL_ADDRESS]: '',
    };

    expect(result).toEqual(expected);
  });
});
