import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * createInitialLossPayee
 * Create new "loss payee" entries
 * @param {Context} context: KeystoneJS context API
 * @param {Array<object>} applicationIdsConnectArray: Array of loss payee IDs "connect" objects
 * @returns {Promise<Array<ApplicationNominatedLossPayee>>} Loss payee - financial UK entries
 */
const createInitialLossPayee = async (context: Context, applicationIdsConnectArray: Array<object>) => {
  const loggingMessage = 'Creating initial nominatedLossPayees with application relationships';

  console.info(`✅ ${loggingMessage}`);

  try {
    const created = await context.db.NominatedLossPayee.createMany({
      data: applicationIdsConnectArray,
    });

    return created;
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default createInitialLossPayee;
