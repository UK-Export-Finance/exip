import shouldNullifyAgentServiceChargeData from '.';
import FIELD_IDS from '../../constants/field-ids/insurance/export-contract';
import { mockExportContractAgentServiceCharge } from '../../test-mocks';

const {
  AGENT_SERVICE: { IS_CHARGING },
} = FIELD_IDS;

const mockFormBody = {
  isNotCharging: {
    [IS_CHARGING]: 'false',
  },
  isCharging: {
    [IS_CHARGING]: 'true',
  },
};

const mockExportContractAgentServiceChargeNoFields = {
  id: mockExportContractAgentServiceCharge.id,
};

describe('server/helpers/should-nullify-agent-service-charge-data', () => {
  describe(`when formBody has ${IS_CHARGING} with a value of 'false' and the application has charge data`, () => {
    it('should return true', () => {
      const result = shouldNullifyAgentServiceChargeData(mockFormBody.isNotCharging, mockExportContractAgentServiceCharge);

      expect(result).toEqual(true);
    });
  });

  describe(`when formBody has ${IS_CHARGING} with a value of 'false', but the application has no charge data`, () => {
    it('should return false', () => {
      const result = shouldNullifyAgentServiceChargeData(mockFormBody.isNotCharging, mockExportContractAgentServiceChargeNoFields);

      expect(result).toEqual(false);
    });
  });

  describe(`when formBody has ${IS_CHARGING} with a value of 'true' and the application has charge data`, () => {
    it('should return false', () => {
      const result = shouldNullifyAgentServiceChargeData(mockFormBody.isCharging, mockExportContractAgentServiceCharge);

      expect(result).toEqual(false);
    });
  });
});
