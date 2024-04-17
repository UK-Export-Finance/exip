import mapAndSave from '.';
import save from '../../save-data/export-contract-agent-service-charge';
import { mockApplication } from '../../../../../test-mocks';

describe('controllers/insurance/export-contract/map-and-save/export-contract-agent-service-charge - api errors', () => {
  jest.mock('../../save-data/export-contract-agent-service-charge');

  const mockFormBody = {
    _csrf: '1234',
    mock: true,
  };

  describe('when save application exportContractAgentServiceCharge call does not return anything', () => {
    beforeEach(() => {
      save.exportContractAgentServiceCharge = jest.fn(() => Promise.resolve());
    });

    it('should return false', async () => {
      const result = await mapAndSave.exportContractAgentServiceCharge(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });

  describe('when save application exportContractAgentServiceCharge call fails', () => {
    beforeEach(() => {
      save.exportContractAgentServiceCharge = jest.fn(() => Promise.reject(new Error('mock')));
    });

    it('should return false', async () => {
      const result = await mapAndSave.exportContractAgentServiceCharge(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });
});
