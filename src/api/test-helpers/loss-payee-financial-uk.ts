import { ApplicationLossPayeeFinancialUk, TestHelperCreate } from '../types';

/**
 * create a nominated loss payee financial details uk helper
 * Creates a blank ApplicationLossPayeeFinancialUk.
 * @param {Object} KeystoneJS context API
 * @returns {Object} Created ApplicationLossPayeeFinancialUk
 */
const createLossPayeeFinancialDetailsUk = async ({ context }: TestHelperCreate) => {
  try {
    console.info('Creating a loss payee financial details Uk (test helpers)');
    const lossPayeeFinancialDetailsUk = (await context.query.LossPayeeFinancialUk.createOne({
      data: {},
      query: 'id',
    })) as ApplicationLossPayeeFinancialUk;

    return lossPayeeFinancialDetailsUk;
  } catch (err) {
    console.error('Error creating a loss payee financial details uk %O', err);
    return err;
  }
};

export default createLossPayeeFinancialDetailsUk;
