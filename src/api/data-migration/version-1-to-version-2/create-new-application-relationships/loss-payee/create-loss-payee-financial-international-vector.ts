import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * lossPayeeFinancialInternationalVector
 * Create new "loss payee - financial international vector" entries
 * @param {Context} context: KeystoneJS context API
 * @param {Array<object>} lossPayeeIdsConnectArray: Array of loss payee IDs "connect" objects
 * @returns {Promise<Array<ApplicationLossPayeeFinancialInternationalVector>>} Loss payee - financial international vector entries
 */
const lossPayeeFinancialInternationalVector = async (context: Context, lossPayeeIdsConnectArray: Array<object>) => {
  const loggingMessage = 'Creating nominatedLossPayees - financial international vector';

  console.info(`✅ ${loggingMessage}`);

  try {
    const created = await context.db.LossPayeeFinancialInternationalVector.createMany({
      data: lossPayeeIdsConnectArray,
    });

    return created;
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default lossPayeeFinancialInternationalVector;
