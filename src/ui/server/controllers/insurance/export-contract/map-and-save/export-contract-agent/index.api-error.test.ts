import mapAndSave from '.';
import saveAgent from '../../save-data/export-contract-agent';
import saveAgentService from '../../save-data/export-contract-agent-service';
import saveAgentServiceCharge from '../../save-data/export-contract-agent-service-charge';
import EXPORT_CONTRACT_FIELD_IDS from '../../../../../constants/field-ids/insurance/export-contract';
import { mockApplication } from '../../../../../test-mocks';

const { USING_AGENT } = EXPORT_CONTRACT_FIELD_IDS;

describe('controllers/insurance/export-contract/map-and-save/export-contract-agent - api errors', () => {
  jest.mock('../../save-data/export-contract-agent');

  const mockFormBody = {
    _csrf: '1234',
    [USING_AGENT]: 'false',
  };

  describe('when saveAgent.exportContractAgent call does not return anything', () => {
    beforeEach(() => {
      saveAgent.exportContractAgent = jest.fn(() => Promise.resolve());
    });

    it('should return false', async () => {
      const result = await mapAndSave.exportContractAgent(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });

  describe('when saveAgent.exportContractAgent call fails', () => {
    beforeEach(() => {
      saveAgent.exportContractAgent = jest.fn(() => Promise.reject(new Error('mock')));
    });

    it('should return false', async () => {
      const result = await mapAndSave.exportContractAgent(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });

  describe('when save saveAgentServiceCharge.exportContractAgentServiceCharge call does not return anything', () => {
    beforeEach(() => {
      saveAgentServiceCharge.exportContractAgentServiceCharge = jest.fn(() => Promise.resolve());
    });

    it('should return false', async () => {
      const result = await mapAndSave.exportContractAgent(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });

  describe('when save saveAgentServiceCharge.exportContractAgentServiceCharge call fails', () => {
    beforeEach(() => {
      saveAgentServiceCharge.exportContractAgentServiceCharge = jest.fn(() => Promise.reject(new Error('mock')));
    });

    it('should return false', async () => {
      const result = await mapAndSave.exportContractAgent(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });

  describe('when save saveAgentService.exportContractAgentService call does not return anything', () => {
    beforeEach(() => {
      saveAgentService.exportContractAgentService = jest.fn(() => Promise.resolve());
    });

    it('should return false', async () => {
      const result = await mapAndSave.exportContractAgent(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });

  describe('when save saveAgentService.exportContractAgentService call fails', () => {
    beforeEach(() => {
      saveAgentService.exportContractAgentService = jest.fn(() => Promise.reject(new Error('mock')));
    });

    it('should return false', async () => {
      const result = await mapAndSave.exportContractAgent(mockFormBody, mockApplication);

      expect(result).toEqual(false);
    });
  });
});
