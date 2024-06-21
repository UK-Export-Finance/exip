import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * lossPayeeFinancialUkVector
 * Create new "loss payee - financial UK vector" entires
 * @param {Context} context: KeystoneJS context API
 * @param {Array<object>} lossPayeeIdsConnectArray: Array of loss payee IDs "connect" objects
 * @returns {Promise<Array<ApplicationLossPayeeFinancialUkVector>>} Loss payee - financial UK vector entries
 */
const lossPayeeFinancialUkVector = async (context: Context, lossPayeeIdsConnectArray: Array<object>) => {
  const loggingMessage = 'Creating nominatedLossPayees - financial UK vector';

  console.info(`✅ ${loggingMessage}`);

  try {
    const created = await context.db.LossPayeeFinancialUkVector.createMany({
      data: lossPayeeIdsConnectArray,
    });

    return created;
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default lossPayeeFinancialUkVector;
