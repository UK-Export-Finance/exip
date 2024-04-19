import mapAndSave from '.';
import save from '../../save-data/export-contract-agent-service';
import { mockApplication } from '../../../../../test-mocks';

describe('controllers/insurance/export-contract/map-and-save/export-contract-agent-service - api errors', () => {
  jest.mock('../../save-data/export-contract-agent-service-charge');

  const mockFormBody = {
    _csrf: '1234',
    mock: true,
  };

  describe('when save application exportContractAgentService call does not return anything', () => {
    beforeEach(() => {
      save.exportContractAgentService = jest.fn(() => Promise.resolve());
    });

    it('should return false', async () => {
      const result = await mapAndSave.exportContractAgentService(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });

  describe('when save application exportContractAgentService call fails', () => {
    beforeEach(() => {
      save.exportContractAgentService = jest.fn(() => Promise.reject(new Error('mock')));
    });

    it('should return false', async () => {
      const result = await mapAndSave.exportContractAgentService(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });
});
