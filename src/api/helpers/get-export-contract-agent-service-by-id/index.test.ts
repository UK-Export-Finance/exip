import getExportContractAgentServiceById from '.';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import exportContractAgentService from '../../test-helpers/export-contract-agent-service';
import { Context, ApplicationExportContractAgentService } from '../../types';

describe('helpers/get-export-contract-agent-service-by-id', () => {
  let context: Context;
  let createdService: ApplicationExportContractAgentService;

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    createdService = await exportContractAgentService.create(context) as ApplicationExportContractAgentService;
  });

  it('should return an export contract agent service by ID', async () => {
    const result = (await getExportContractAgentServiceById(context, createdService.id));

    expect(result.id).toEqual(createdService.id);
  });

  describe('when an export contract agent service is not found', () => {
    it('should throw an error', async () => {
      const invalidId = 'invalid-id';

      try {
        await getExportContractAgentServiceById(context, invalidId);
      } catch (err) {
        const errorMessage = `Getting exportContractAgentService by ID ${invalidId}`;

        const newError = new Error(errorMessage);

        const expected = new Error(`${errorMessage} ${newError}`);
        expect(err).toEqual(expected);
      }
    });
  });
});
