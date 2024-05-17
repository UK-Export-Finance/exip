import nullify from '.';
import saveAddress from '../../save-data/company-different-trading-address';
import nullifyCompanyDifferentTradingAddress from '../../../../../helpers/nullify-company-different-trading-address-data';
import { mockApplication, mockSpyPromise } from '../../../../../test-mocks';

describe('controllers/insurance/business/map-and-save/nullify-company-different-address', () => {
  jest.mock('../../save-data/company-different-trading-address');

  const mockSaveCompanyDifferentTradingAddress = mockSpyPromise();

  saveAddress.companyDifferentTradingAddress = mockSaveCompanyDifferentTradingAddress;


  it('should call saveAddress.companyDifferentTradingAddress', async () => {
    await nullify.companyDifferentTradingAddress(mockApplication);

    expect(saveAddress.companyDifferentTradingAddress).toHaveBeenCalledTimes(1);
    expect(saveAddress.companyDifferentTradingAddress).toHaveBeenCalledWith(mockApplication, nullifyCompanyDifferentTradingAddress());
  });

  describe('when save saveAddress.companyDifferentTradingAddress call does not return anything', () => {
    beforeEach(() => {
      saveAddress.companyDifferentTradingAddress = jest.fn(() => Promise.resolve());
    });

    it('should return false', async () => {
      const result = await nullify.companyDifferentTradingAddress(mockApplication);

      expect(result).toEqual(false);
    });
  });

  describe('when save saveAddress.companyDifferentTradingAddress call fails', () => {
    beforeEach(() => {
      saveAddress.companyDifferentTradingAddress = jest.fn(() => Promise.reject(new Error('mock')));
    });

    it('should return false', async () => {
      const result = await nullify.companyDifferentTradingAddress(mockApplication);

      expect(result).toEqual(false);
    });
  });
});
