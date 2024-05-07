import mapAndSave from '.';
import FIELD_IDS from '../../../../../constants/field-ids/insurance/export-contract';
import saveService from '../../save-data/export-contract-agent-service';
import saveCharge from '../../save-data/export-contract-agent-service-charge';
import nullifyAgentServiceChargeData from '../../../../../helpers/nullify-agent-service-charge-data';
import generateValidationErrors from '../../../../../helpers/validation';
import { mockApplication as application, mockApplicationAgentServiceChargeEmpty, mockSpyPromise } from '../../../../../test-mocks';

const {
  AGENT_SERVICE: { IS_CHARGING },
} = FIELD_IDS;

describe('controllers/insurance/export-contract/map-and-save/export-contract-agent-service', () => {
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

  const mockApplication = {
    withChargeData: application,
    noChargeData: mockApplicationAgentServiceChargeEmpty,
  };

  const mockValidationErrors = generateValidationErrors(IS_CHARGING, 'error', {});

  let mockServiceSave;
  let mockServiceChargeSave;

  const setupMocks = () => {
    jest.resetAllMocks();

    mockServiceSave = mockSpyPromise();
    mockServiceChargeSave = mockSpyPromise();

    saveService.exportContractAgentService = mockServiceSave;
    saveCharge.exportContractAgentServiceCharge = mockServiceChargeSave;
  };

  describe('when the form has data, IS_CHARGING=true, no charge data', () => {
    describe('when the form has validation errors', () => {
      beforeEach(() => {
        setupMocks();
      });

      it('should call saveService.exportContractAgentService with application, submitted data and validationErrors.errorList', async () => {
        await mapAndSave.exportContractAgentService(mockFormBody.isCharging, mockApplication.noChargeData, mockValidationErrors);

        expect(saveService.exportContractAgentService).toHaveBeenCalledTimes(1);
        expect(saveService.exportContractAgentService).toHaveBeenCalledWith(
          mockApplication.noChargeData,
          mockFormBody.isCharging,
          mockValidationErrors?.errorList,
        );
      });

      it('should NOT call saveCharge.exportContractAgentServiceCharge with application, submitted data and validationErrors.errorList', async () => {
        await mapAndSave.exportContractAgentService(mockFormBody.isCharging, mockApplication.noChargeData, mockValidationErrors);

        expect(saveCharge.exportContractAgentServiceCharge).toHaveBeenCalledTimes(0);
      });

      it('should return true', async () => {
        const result = await mapAndSave.exportContractAgentService(mockFormBody.isCharging, mockApplication.noChargeData, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });

    describe('when the form does NOT have validation errors ', () => {
      beforeEach(() => {
        setupMocks();
      });

      it('should call saveService.exportContractAgentService with application and submitted data', async () => {
        await mapAndSave.exportContractAgentService(mockFormBody.isCharging, mockApplication.noChargeData);

        expect(saveService.exportContractAgentService).toHaveBeenCalledTimes(1);
        expect(saveService.exportContractAgentService).toHaveBeenCalledWith(mockApplication.noChargeData, mockFormBody.isCharging);
      });

      it('should NOT call saveCharge.exportContractAgentServiceCharge with application and submitted data', async () => {
        await mapAndSave.exportContractAgentService(mockFormBody.isCharging, mockApplication.noChargeData);

        expect(saveCharge.exportContractAgentServiceCharge).toHaveBeenCalledTimes(0);
      });

      it('should return true', async () => {
        const result = await mapAndSave.exportContractAgentService(mockFormBody.isCharging, mockApplication.noChargeData, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });
  });

  describe('when the form has data, IS_CHARGING=false, has charge data', () => {
    describe('when the form has validation errors', () => {
      beforeEach(() => {
        setupMocks();
      });

      it('should call saveService.exportContractAgentService with application, submitted data and validationErrors.errorList', async () => {
        await mapAndSave.exportContractAgentService(mockFormBody.isNotCharging, mockApplication.withChargeData, mockValidationErrors);

        expect(saveService.exportContractAgentService).toHaveBeenCalledTimes(1);
        expect(saveService.exportContractAgentService).toHaveBeenCalledWith(
          mockApplication.withChargeData,
          mockFormBody.isNotCharging,
          mockValidationErrors?.errorList,
        );
      });

      it('should call saveCharge.exportContractAgentServiceCharge with application and nullified agent charges data', async () => {
        await mapAndSave.exportContractAgentService(mockFormBody.isNotCharging, mockApplication.withChargeData, mockValidationErrors);

        expect(saveCharge.exportContractAgentServiceCharge).toHaveBeenCalledTimes(1);
        expect(saveCharge.exportContractAgentServiceCharge).toHaveBeenCalledWith(mockApplication.withChargeData, nullifyAgentServiceChargeData());
      });

      it('should return true', async () => {
        const result = await mapAndSave.exportContractAgentService(mockFormBody.isNotCharging, mockApplication.withChargeData, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });

    describe('when the form does NOT have validation errors', () => {
      beforeEach(() => {
        setupMocks();
      });

      it('should call saveService.exportContractAgentService with application and submitted data', async () => {
        await mapAndSave.exportContractAgentService(mockFormBody.isNotCharging, mockApplication.withChargeData);

        expect(saveService.exportContractAgentService).toHaveBeenCalledTimes(1);
        expect(saveService.exportContractAgentService).toHaveBeenCalledWith(mockApplication.withChargeData, mockFormBody.isNotCharging);
      });

      it('should call saveCharge.exportContractAgentServiceCharge with application and nullified agent charges data', async () => {
        await mapAndSave.exportContractAgentService(mockFormBody.isNotCharging, mockApplication.withChargeData);

        expect(saveCharge.exportContractAgentServiceCharge).toHaveBeenCalledTimes(1);
        expect(saveCharge.exportContractAgentServiceCharge).toHaveBeenCalledWith(mockApplication.withChargeData, nullifyAgentServiceChargeData());
      });

      it('should return true', async () => {
        const result = await mapAndSave.exportContractAgentService(mockFormBody.isNotCharging, mockApplication.withChargeData, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });
  });

  describe('when the form does not have any data', () => {
    it('should return true', async () => {
      const mockEmptyFormBody = { _csrf: '1234' };

      const result = await mapAndSave.exportContractAgentService(mockEmptyFormBody, mockApplication.withChargeData, mockValidationErrors);

      expect(result).toEqual(true);
    });
  });
});
