import { APPLICATION } from '../../constants';
import createAPrivateMarket from '../create-a-private-market';
import createAnExportContractAgent from '../create-an-export-contract-agent';
import { Context, CreateExportContractResponse } from '../../types';

/**
 * createAnExportContract
 * Create an export contract with an application relationship.
 * @param {Context} KeystoneJS context API
 * @param {String} Application ID
 * @returns {Promise<Object>} Created export contract
 */
const createAnExportContract = async (context: Context, applicationId: string): Promise<CreateExportContractResponse> => {
  console.info('Creating an export contract for ', applicationId);

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
      exportContract,
      privateMarket,
      agent,
      agentService,
    };
  } catch (err) {
    console.error('Error creating an export contract %O', err);

    throw new Error(`Creating an export contract ${err}`);
  }
};

export default createAnExportContract;
