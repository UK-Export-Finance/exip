import getExportContractAgentServiceChargeById from '.';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import exportContractAgentServiceCharge from '../../test-helpers/export-contract-agent-service-charge';
import { Context, ApplicationExportContractAgentServiceCharge } from '../../types';

describe('helpers/get-export-contract-agent-service-charge-by-id', () => {
  let context: Context;
  let createdCharge: ApplicationExportContractAgentServiceCharge;

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    createdCharge = await exportContractAgentServiceCharge.create(context) as ApplicationExportContractAgentServiceCharge;
  });

  it('should return an export contract agent service by ID', async () => {
    const result = (await getExportContractAgentServiceChargeById(context, createdCharge.id));

    expect(result.id).toEqual(createdCharge.id);
  });

  describe('when an export contract agent service is not found', () => {
    it('should throw an error', async () => {
      const invalidId = 'invalid-id';

      try {
        await getExportContractAgentServiceChargeById(context, invalidId);
      } catch (err) {
        const errorMessage = `Getting exportContractAgentServiceCharge by ID ${invalidId}`;

        const newError = new Error(errorMessage);

        const expected = new Error(`${errorMessage} ${newError}`);
        expect(err).toEqual(expected);
      }
    });
  });
});
