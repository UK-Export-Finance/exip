import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * createPrivateMarket
 * Create new "private market" entries with "export contract" relationships.
 * 1) Create an array of export contract ID "connect" relationships.
 * 2) Create "private market" entries.
 * @param {Context} context: KeystoneJS context API
 * @param {Array<Application>} applications: Applications
 * @returns {Promise<Array<ApplicationPrivateMarket>>} Private market entries
 */
const createPrivateMarket = async (context: Context, applications: Array<object>) => {
  const loggingMessage = 'Creating privateMarkets with exportContract relationships';

  console.info(`✅ ${loggingMessage}`);

  try {
    const exportContractIdsConnectArray = applications.map((application) => ({
      exportContract: {
        connect: {
          id: application.exportContract,
        },
      },
    }));

    const created = await context.db.PrivateMarket.createMany({
      data: exportContractIdsConnectArray,
    });

    return created;
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default createPrivateMarket;
