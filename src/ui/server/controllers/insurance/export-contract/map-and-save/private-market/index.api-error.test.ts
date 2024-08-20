import mapAndSave from '.';
import save from '../../save-data/private-market';
import { mockApplication, mockSpyPromiseRejection } from '../../../../../test-mocks';

describe('controllers/insurance/export-contract/map-and-save/private-market - api errors', () => {
  jest.mock('../../save-data/private-market');

  const mockFormBody = {
    _csrf: '1234',
    mock: true,
  };

  describe('when save application privateMarket call does not return anything', () => {
    beforeEach(() => {
      save.privateMarket = jest.fn(() => Promise.resolve());
    });

    it('should return false', async () => {
      const result = await mapAndSave.privateMarket(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });

  describe('when save application privateMarket call fails', () => {
    beforeEach(() => {
      save.privateMarket = mockSpyPromiseRejection;
    });

    it('should return false', async () => {
      const result = await mapAndSave.privateMarket(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });
});
