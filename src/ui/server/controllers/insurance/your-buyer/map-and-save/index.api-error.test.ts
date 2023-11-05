import mapAndSave from '.';
import save from '../save-data';
import { mockApplication } from '../../../../test-mocks';

describe('controllers/insurance/business/map-and-save - api errors', () => {
  jest.mock('../save-data');

  const mockFormBody = {
    _csrf: '1234',
    mock: true,
  };

  describe('when save application buyer call does not return anything', () => {
    beforeEach(() => {
      save.buyer = jest.fn(() => Promise.resolve());
    });

    it('should return false', async () => {
      const result = await mapAndSave.yourBuyer(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });

  describe('when save application buyer call fails', () => {
    beforeEach(() => {
      save.buyer = jest.fn(() => Promise.reject(new Error('mock')));
    });

    it('should return false', async () => {
      const result = await mapAndSave.yourBuyer(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });
});
