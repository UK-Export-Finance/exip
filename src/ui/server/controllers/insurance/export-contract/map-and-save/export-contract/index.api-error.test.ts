import mapAndSave from '.';
import save from '../../save-data/export-contract';
import { mockApplication } from '../../../../../test-mocks';

describe('controllers/insurance/export-contract/map-and-save/export-contract - api errors', () => {
  jest.mock('../../save-data/export-contract');

  const mockFormBody = {
    _csrf: '1234',
    mock: true,
  };

  describe('when save application exportContract call does not return anything', () => {
    beforeEach(() => {
      save.exportContract = jest.fn(() => Promise.resolve());
    });

    it('should return false', async () => {
      const result = await mapAndSave.exportContract(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });

  describe('when save application exportContract call fails', () => {
    beforeEach(() => {
      save.exportContract = jest.fn(() => Promise.reject(new Error('mock')));
    });

    it('should return false', async () => {
      const result = await mapAndSave.exportContract(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });
});
