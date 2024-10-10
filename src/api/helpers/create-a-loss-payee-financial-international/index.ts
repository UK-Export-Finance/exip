import { ApplicationLossPayeeFinancialInternational, Context } from '../../types';

/**
 * createALossPayeeFinancialInternational
 * Create a "Loss payee financial International" with a Loss payee relationship
 * @param {Context} context: KeystoneJS context API
 * @param {String} Loss payee ID
 * @returns {Promise<Object>} Created loss payee financial international
 */
const createALossPayeeFinancialInternational = async (context: Context, lossPayeeId: string): Promise<ApplicationLossPayeeFinancialInternational> => {
  console.info('Creating a loss payee financial (international) for %s', lossPayeeId);

  try {
    const lossPayeeFinancialInternational = await context.db.LossPayeeFinancialInternational.createOne({
      data: {
        lossPayee: {
          connect: { id: lossPayeeId },
        },
      },
    });

    const vector = await context.db.LossPayeeFinancialInternationalVector.createOne({
      data: {
        financialInternational: {
          connect: { id: lossPayeeFinancialInternational.id },
        },
      },
    });

    return {
      ...lossPayeeFinancialInternational,
      vector,
    };
  } catch (error) {
    console.error('Error creating a loss payee financial (international) for %o', error);

    throw new Error(`Creating a loss payee financial (international) for ${error}`);
  }
};

export default createALossPayeeFinancialInternational;
