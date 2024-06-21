import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * lossPayeeFinancialInternational
 * Create new "loss payee - financial international" entires
 * @param {Context} context: KeystoneJS context API
 * @param {Array<object>} lossPayeeIdsConnectArray: Array of loss payee IDs "connect" objects
 * @returns {Promise<Array<ApplicationLossPayeeFinancialInternational>>} Loss payee - financial international entries
 */
const lossPayeeFinancialInternational = async (context: Context, lossPayeeIdsConnectArray: Array<object>) => {
  const loggingMessage = 'Creating nominatedLossPayees - financial international';

  console.info(`✅ ${loggingMessage}`);

  try {
    const created = await context.db.LossPayeeFinancialInternational.createMany({
      data: lossPayeeIdsConnectArray,
    });

    return created;
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default lossPayeeFinancialInternational;
