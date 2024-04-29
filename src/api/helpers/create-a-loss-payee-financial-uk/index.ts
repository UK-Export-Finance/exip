import { ApplicationLossPayeeFinancialUk, Context } from '../../types';

/**
 * createALossPayeeFinancialUk
 * Create a "Loss payee financial UK" with a Loss payee relationship
 * @param {Object} KeystoneJS context API
 * @param {String} Loss payee ID
 * @returns {Promise<Object>} Created loss payee financial UK
 */
const createALossPayeeFinancialUk = async (context: Context, lossPayeeId: string): Promise<ApplicationLossPayeeFinancialUk> => {
  console.info('Creating a loss payee financial (UK) for ', lossPayeeId);

  try {
    const lossPayeeFinancialUk = await context.db.LossPayeeFinancialUk.createOne({
      data: {
        lossPayee: {
          connect: { id: lossPayeeId },
        },
      },
    });

    await context.db.LossPayeeFinancialUkVector.createOne({
      data: {
        financialInternational: {
          connect: { id: lossPayeeFinancialUk.id },
        },
      },
    });

    return lossPayeeFinancialUk;
  } catch (err) {
    console.error('Error creating a loss payee financial (UK) for %O', err);

    throw new Error(`Creating a loss payee financial (UK) for ${err}`);
  }
};

export default createALossPayeeFinancialUk;
