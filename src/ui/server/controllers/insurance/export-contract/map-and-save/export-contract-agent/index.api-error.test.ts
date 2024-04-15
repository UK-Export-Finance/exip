import mapAndSave from '.';
import save from '../../save-data/export-contract-agent';
import { mockApplication } from '../../../../../test-mocks';

describe('controllers/insurance/export-contract/map-and-save/export-contract-agent - api errors', () => {
  jest.mock('../../save-data/export-contract-agent');

  const mockFormBody = {
    _csrf: '1234',
    mock: true,
  };

  describe('when save application exportContractAgent call does not return anything', () => {
    beforeEach(() => {
      save.exportContractAgent = jest.fn(() => Promise.resolve());
    });

    it('should return false', async () => {
      const result = await mapAndSave.exportContractAgent(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });

  describe('when save application exportContractAgent call fails', () => {
    beforeEach(() => {
      save.exportContractAgent = jest.fn(() => Promise.reject(new Error('mock')));
    });

    it('should return false', async () => {
      const result = await mapAndSave.exportContractAgent(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });
});
