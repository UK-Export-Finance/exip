import nullify from '.';
import saveAgentService from '../../save-data/export-contract-agent-service';
import saveAgentServiceCharge from '../../save-data/export-contract-agent-service-charge';
import nullifyAgentServiceData from '../../../../../helpers/nullify-agent-service-data';
import nullifyAgentServiceChargeData from '../../../../../helpers/nullify-agent-service-charge-data';
import { mockApplication, mockSpyPromise } from '../../../../../test-mocks';

describe('controllers/insurance/export-contract/map-and-save/export-contract-agent', () => {
  jest.mock('../../save-data/export-contract-agent-service');
  jest.mock('../../save-data/export-contract-agent-service-charge');

  const mockSaveExportContractAgentService = mockSpyPromise();
  const mockSaveExportContractAgentServiceCharge = mockSpyPromise();

  saveAgentService.exportContractAgentService = mockSaveExportContractAgentService;
  saveAgentServiceCharge.exportContractAgentServiceCharge = mockSaveExportContractAgentServiceCharge;

  it('should call saveAgentServiceCharge.exportContractAgentServiceCharge', async () => {
    await nullify.exportContractAgentServiceAndCharge(mockApplication);

    expect(saveAgentServiceCharge.exportContractAgentServiceCharge).toHaveBeenCalledTimes(1);
    expect(saveAgentServiceCharge.exportContractAgentServiceCharge).toHaveBeenCalledWith(mockApplication, nullifyAgentServiceChargeData());
  });

  it('should call saveAgentService.exportContractAgentService', async () => {
    await nullify.exportContractAgentServiceAndCharge(mockApplication);

    expect(saveAgentService.exportContractAgentService).toHaveBeenCalledTimes(1);
    expect(saveAgentService.exportContractAgentService).toHaveBeenCalledWith(mockApplication, nullifyAgentServiceData());
  });

  describe('when save saveAgentServiceCharge.exportContractAgentServiceCharge call does not return anything', () => {
    beforeEach(() => {
      saveAgentServiceCharge.exportContractAgentServiceCharge = jest.fn(() => Promise.resolve());
    });

    it('should return false', async () => {
      const result = await nullify.exportContractAgentServiceAndCharge(mockApplication);

      expect(result).toEqual(false);
    });
  });

  describe('when save saveAgentServiceCharge.exportContractAgentServiceCharge call fails', () => {
    beforeEach(() => {
      saveAgentServiceCharge.exportContractAgentServiceCharge = jest.fn(() => Promise.reject(new Error('mock')));
    });

    it('should return false', async () => {
      const result = await nullify.exportContractAgentServiceAndCharge(mockApplication);

      expect(result).toEqual(false);
    });
  });

  describe('when save saveAgentService.exportContractAgentService call does not return anything', () => {
    beforeEach(() => {
      saveAgentService.exportContractAgentService = jest.fn(() => Promise.resolve());
    });

    it('should return false', async () => {
      const result = await nullify.exportContractAgentServiceAndCharge(mockApplication);

      expect(result).toEqual(false);
    });
  });

  describe('when save saveAgentService.exportContractAgentService call fails', () => {
    beforeEach(() => {
      saveAgentService.exportContractAgentService = jest.fn(() => Promise.reject(new Error('mock')));
    });

    it('should return false', async () => {
      const result = await nullify.exportContractAgentServiceAndCharge(mockApplication);

      expect(result).toEqual(false);
    });
  });
});
