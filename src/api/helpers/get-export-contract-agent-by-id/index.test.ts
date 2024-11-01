import getExportContractAgentById from '.';
import { mockInvalidId } from '../../test-mocks';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import exportContractAgent from '../../test-helpers/export-contract-agent';
import { Context, ApplicationExportContractAgent } from '../../types';

describe('helpers/get-export-contract-agent-by-id', () => {
  let context: Context;
  let createdExportContractAgent: ApplicationExportContractAgent;

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    createdExportContractAgent = (await exportContractAgent.create(context)) as ApplicationExportContractAgent;
  });

  it('should return an export contract agent by ID', async () => {
    const result = await getExportContractAgentById(context, createdExportContractAgent.id);

    expect(result.id).toEqual(createdExportContractAgent.id);
  });

  describe('when an export contract agent is not found', () => {
    it('should throw an error', async () => {
      try {
        await getExportContractAgentById(context, mockInvalidId);
      } catch (error) {
        const errorMessage = `Getting exportContractAgent by ID ${mockInvalidId}`;

        const newError = new Error(errorMessage);

        const expected = new Error(`${errorMessage} ${newError}`);
        expect(error).toEqual(expected);
      }
    });
  });
});
