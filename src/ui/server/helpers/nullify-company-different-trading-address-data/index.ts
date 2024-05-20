import FIELD_IDS from '../../constants/field-ids/insurance/business';

const {
  ALTERNATIVE_TRADING_ADDRESS: { FULL_ADDRESS },
} = FIELD_IDS;

/**
 * nullifyCompanyDifferentTradingAddress
 * Create an object with null DIFFERENT_TRADING_ADDRESS fields.
 * @returns {ApplicationCompanyDifferentTradingAddress}
 */
const nullifyCompanyDifferentTradingAddress = () => ({
  [FULL_ADDRESS]: '',
});

export default nullifyCompanyDifferentTradingAddress;
