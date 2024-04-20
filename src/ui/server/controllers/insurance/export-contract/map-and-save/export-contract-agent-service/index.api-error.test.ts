import mapAndSave from '.';
import FIELD_IDS from '../../../../../constants/field-ids/insurance/export-contract';
import saveService from '../../save-data/export-contract-agent-service';
import saveCharge from '../../save-data/export-contract-agent-service-charge';
import { mockApplication, mockApplicationAgentServiceChargeEmpty } from '../../../../../test-mocks';

const {
  AGENT_SERVICE: { IS_CHARGING },
} = FIELD_IDS;

describe('controllers/insurance/export-contract/map-and-save/export-contract-agent-service - api errors', () => {
  jest.mock('../../save-data/export-contract-agent-service');
  jest.mock('../../save-data/export-contract-agent-service-charge');

  const mockCsrf = '1234';

  const mockFormBody = {
    isCharging: {
      _csrf: mockCsrf,
      [IS_CHARGING]: 'true',
    },
    isNotCharging: {
      _csrf: mockCsrf,
      [IS_CHARGING]: 'false',
    },
  };

  describe('when saveService.exportContractAgentService call does not return anything', () => {
    beforeEach(() => {
      saveService.exportContractAgentService = jest.fn(() => Promise.resolve());
    });

    it('should return false', async () => {
      const result = await mapAndSave.exportContractAgentService(mockFormBody.isNotCharging, mockApplication);

      expect(result).toEqual(false);
    });
  });

  describe('when saveService.exportContractAgentService call fails', () => {
    beforeEach(() => {
      saveService.exportContractAgentService = jest.fn(() => Promise.reject(new Error('mock')));
    });

    it('should return false', async () => {
      const result = await mapAndSave.exportContractAgentService(mockFormBody.isNotCharging, mockApplication);

      expect(result).toEqual(false);
    });
  });

  describe('when the form has data, IS_CHARGING=false, has charge data', () => {
    describe('when saveCharge.exportContractAgentServiceCharge call does not return anything', () => {
      beforeEach(() => {
        saveCharge.exportContractAgentServiceCharge = jest.fn(() => Promise.resolve());
      });

      it('should return false', async () => {
        const result = await mapAndSave.exportContractAgentService(mockFormBody.isCharging, mockApplicationAgentServiceChargeEmpty);

        expect(result).toEqual(false);
      });
    });

    describe('when saveCharge.exportContractAgentServiceCharge call fails', () => {
      beforeEach(() => {
        saveCharge.exportContractAgentServiceCharge = jest.fn(() => Promise.reject(new Error('mock')));
      });

      it('should return false', async () => {
        const result = await mapAndSave.exportContractAgentService(mockFormBody.isCharging, mockApplicationAgentServiceChargeEmpty);

        expect(result).toEqual(false);
      });
    });
  });
});
