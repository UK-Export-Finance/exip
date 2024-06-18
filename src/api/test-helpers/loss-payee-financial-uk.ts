import createLossPayeeFinancialDetailsUkVector from './loss-payee-financial-uk-vector';
import { ApplicationLossPayeeFinancialUk, TestHelperCreate } from '../types';

/**
 * create a nominated loss payee financial uk helper
 * Creates a blank ApplicationLossPayeeFinancialUk.
 * @param {Context} KeystoneJS context API
 * @returns {Object} Created ApplicationLossPayeeFinancialUk
 */
const createLossPayeeFinancialDetailsUk = async ({ context }: TestHelperCreate) => {
  try {
    console.info('Creating a loss payee financial uk (test helpers)');

    const financialUkVector = await createLossPayeeFinancialDetailsUkVector({ context });

    const lossPayeeFinancialDetailsUk = (await context.query.LossPayeeFinancialUk.createOne({
      data: {
        vector: {
          connect: {
            id: financialUkVector.id,
          },
        },
      },
      query: 'id accountNumber sortCode bankAddress vector { accountNumberVector sortCodeVector }',
    })) as ApplicationLossPayeeFinancialUk;

    return lossPayeeFinancialDetailsUk;
  } catch (err) {
    console.error('Error creating a loss payee financial uk (test helpers) %O', err);
    return err;
  }
};

export default createLossPayeeFinancialDetailsUk;
