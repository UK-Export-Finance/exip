import mapAndSave from '.';
import save from '../../save-data/different-trading-address';
import { mockApplication } from '../../../../../test-mocks';
import { FIELD_IDS } from '../../../../../constants';

const {
  EXPORTER_BUSINESS: { ALTERNATIVE_TRADING_ADDRESS },
} = FIELD_IDS.INSURANCE;

describe('controllers/insurance/business/map-and-save/turnover - API error', () => {
  jest.mock('../../save-data/business');

  const mockFormBody = {
    _csrf: '1234',
    [ALTERNATIVE_TRADING_ADDRESS]: 'test',
  };

  const mockSaveDifferentTradingAddress = jest.fn(() => Promise.resolve({}));
  save.differentTradingAddress = mockSaveDifferentTradingAddress;

  describe('when save application differentTradingAddress call does not return anything', () => {
    beforeEach(() => {
      save.differentTradingAddress = jest.fn(() => Promise.resolve());
    });

    it('should return false', async () => {
      const result = await mapAndSave.differentTradingAddress(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });

  describe('when save application differentTradingAddress call fails', () => {
    beforeEach(() => {
      save.differentTradingAddress = jest.fn(() => Promise.reject(new Error('mock')));
    });

    it('should return false', async () => {
      const result = await mapAndSave.differentTradingAddress(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });
});
