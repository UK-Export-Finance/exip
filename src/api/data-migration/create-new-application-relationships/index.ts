import { Context } from '.keystone/types'; // eslint-disable-line
import createLossPayee from './loss-payee';
import createJointlyInsuredParty from './jointly-insured-party';

interface CreateNewApplicationRelationshipsParams {
  context: Context
  applicationIdsConnectArray: Array<object>
  applications: Array<object>
}

const createNewApplicationRelationships = async ({ context, applicationIdsConnectArray, applications }: CreateNewApplicationRelationshipsParams) => {
  const loggingMessage = 'Creating new relationships for all applications';

  console.info(`✅ ${loggingMessage}`);

  try {
    const newRelationships = await Promise.all([
      createLossPayee(context, applicationIdsConnectArray),
      createJointlyInsuredParty(context, applications),
    ]);

    return newRelationships;
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default createNewApplicationRelationships;
