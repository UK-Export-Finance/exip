import mapAndSave from '.';
import save from '../../save-data/buyer-trading-history';
import { mockApplication } from '../../../../../test-mocks';

describe('controllers/insurance/business/map-and-save/buyer-trading-history - api errors', () => {
  jest.mock('../../save-data/buyer-trading-history');

  const mockFormBody = {
    _csrf: '1234',
    mock: true,
  };

  describe('when save application buyer call does not return anything', () => {
    beforeEach(() => {
      save.buyerTradingHistory = jest.fn(() => Promise.resolve());
    });

    it('should return false', async () => {
      const result = await mapAndSave.buyerTradingHistory(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });

  describe('when save application buyer call fails', () => {
    beforeEach(() => {
      save.buyerTradingHistory = jest.fn(() => Promise.reject(new Error('mock')));
    });

    it('should return false', async () => {
      const result = await mapAndSave.buyerTradingHistory(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });
});
