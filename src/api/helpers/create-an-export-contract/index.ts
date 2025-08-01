import { APPLICATION } from '../../constants';
import createAPrivateMarket from '../create-a-private-market';
import createAnExportContractAgent from '../create-an-export-contract-agent';
import { Context, CreateExportContractResponse } from '../../types';

/**
 * createAnExportContract
 * Create an export contract with an application relationship.
 * @param {Context} context: KeystoneJS context API
 * @param {string} applicationId: Application ID
 * @returns {Promise<object>} Created export contract
 */
const createAnExportContract = async (context: Context, applicationId: string): Promise<CreateExportContractResponse> => {
  console.info('Creating an export contract for %s', applicationId);

  try {
    const exportContract = await context.db.ExportContract.createOne({
      data: {
        application: {
          connect: { id: applicationId },
        },
        finalDestinationKnown: APPLICATION.DEFAULT_FINAL_DESTINATION_KNOWN,
      },
    });

    const privateMarket = await createAPrivateMarket(context, exportContract.id);
    const { agent, agentService } = await createAnExportContractAgent(context, exportContract.id);

    return {
      ...exportContract,
      privateMarket,
      agent,
      agentService,
    };
  } catch (error) {
    console.error('Error creating an export contract %o', error);

    throw new Error(`Creating an export contract ${error}`);
  }
};

export default createAnExportContract;
