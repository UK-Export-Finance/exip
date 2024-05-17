import shouldNullifyCompanyDifferentAddress from '.';

const hasDifferentTradingAddressTrue = 'true';
const hasDifferentTradingAddressFalse = 'false';

const mockAddress = 'Mock address';

describe('server/helpers/should-nullify-company-different-address', () => {
  describe('when hasDifferentTradingAddress=`false` and address is a populated string', () => {
    it('should return true', () => {
      const result = shouldNullifyCompanyDifferentAddress(hasDifferentTradingAddressFalse, mockAddress);

      expect(result).toEqual(true);
    });
  });

  describe('when hasDifferentTradingAddress=`false` and address is an empty string', () => {
    it('should return false', () => {
      const result = shouldNullifyCompanyDifferentAddress(hasDifferentTradingAddressFalse, '');

      expect(result).toEqual(false);
    });
  });

  describe('when hasDifferentTradingAddress=`false` and address is not provided', () => {
    it('should return false', () => {
      const result = shouldNullifyCompanyDifferentAddress(hasDifferentTradingAddressFalse);

      expect(result).toEqual(false);
    });
  });

  describe('when hasDifferentTradingAddress=`true` and address is a populated string', () => {
    it('should return false', () => {
      const result = shouldNullifyCompanyDifferentAddress(hasDifferentTradingAddressTrue, mockAddress);

      expect(result).toEqual(false);
    });
  });
});
