import mapAndSave from '.';
import save from '../../save-data/company-different-trading-address';
import { FIELD_IDS } from '../../../../../constants';
import { mockApplication, mockSpyPromise } from '../../../../../test-mocks';

const {
  ALTERNATIVE_TRADING_ADDRESS: { FULL_ADDRESS },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

describe('controllers/insurance/business/map-and-save/company-different-trading-address - API error', () => {
  jest.mock('../../save-data/company-different-trading-address');

  const mockFormBody = {
    _csrf: '1234',
    [FULL_ADDRESS]: 'mock address',
  };

  const mockSaveDifferentTradingAddress = mockSpyPromise;
  save.companyDifferentTradingAddress = mockSaveDifferentTradingAddress;

  describe('when save application differentTradingAddress call does not return anything', () => {
    beforeEach(() => {
      save.companyDifferentTradingAddress = jest.fn(() => Promise.resolve());
    });

    it('should return false', async () => {
      const result = await mapAndSave.companyDifferentTradingAddress(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });

  describe('when save application differentTradingAddress call fails', () => {
    beforeEach(() => {
      save.companyDifferentTradingAddress = jest.fn(() => Promise.reject(new Error('mock')));
    });

    it('should return false', async () => {
      const result = await mapAndSave.companyDifferentTradingAddress(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });
});
