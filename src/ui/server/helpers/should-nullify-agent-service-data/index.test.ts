import shouldNullifyAgentServiceChargeData from '.';
import FIELD_IDS from '../../constants/field-ids/insurance/export-contract';
import { mockExportContractAgent, mockExportContractAgentIsNotUsing } from '../../test-mocks';

const { USING_AGENT } = FIELD_IDS;

const mockFormBody = {
  isUsingAgent: 'true',
  isNotUsingAgent: 'false',
};

describe('server/helpers/should-nullify-agent-service-data', () => {
  describe(`when ${USING_AGENT} has a value of 'false' and the application has service data`, () => {
    it('should return true', () => {
      const result = shouldNullifyAgentServiceChargeData(mockFormBody.isNotUsingAgent, mockExportContractAgent);

      expect(result).toEqual(true);
    });
  });

  describe(`when ${USING_AGENT} has a value of 'false', but the application has no service data`, () => {
    it('should return false', () => {
      const result = shouldNullifyAgentServiceChargeData(mockFormBody.isNotUsingAgent, mockExportContractAgentIsNotUsing);

      expect(result).toEqual(false);
    });
  });

  describe(`when ${USING_AGENT} has a value of 'true' and the application has service data`, () => {
    it('should return false', () => {
      const result = shouldNullifyAgentServiceChargeData(mockFormBody.isUsingAgent, mockExportContractAgent);

      expect(result).toEqual(false);
    });
  });
});
