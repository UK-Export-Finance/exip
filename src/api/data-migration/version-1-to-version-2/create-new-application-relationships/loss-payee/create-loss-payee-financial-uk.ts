import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * lossPayeeFinancialUk
 * Create new "loss payee - financial UK" entries
 * @param {Context} context: KeystoneJS context API
 * @param {Array<object>} lossPayeeIdsConnectArray: Array of loss payee IDs "connect" objects
 * @returns {Promise<Array<ApplicationLossPayeeFinancialUk>>} Loss payee - financial UK entries
 */
const lossPayeeFinancialUk = async (context: Context, lossPayeeIdsConnectArray: Array<object>) => {
  const loggingMessage = 'Creating nominatedLossPayees - financial UK';

  console.info(`✅ ${loggingMessage}`);

  try {
    const created = await context.db.LossPayeeFinancialUk.createMany({
      data: lossPayeeIdsConnectArray,
    });

    return created;
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default lossPayeeFinancialUk;
