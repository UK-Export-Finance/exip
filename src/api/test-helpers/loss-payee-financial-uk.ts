import { ApplicationLossPayeeFinancialUk, TestHelperCreate } from '../types';

/**
 * create loss payee financial details uk helper
 * Creates a blank LossPayeeFinancialUk.
 * @param {Object} KeystoneJS context API
 * @returns {Object} Created LossPayeeFinancialUk
 */
const createLossPayeeFinancialDetailsUk = async ({ context }: TestHelperCreate) => {
  try {
    console.info('Creating a financial details Uk (test helpers)');
    const lossPayeeFinancialDetailsUk = (await context.query.LossPayeeFinancialUk.createOne({
      data: {},
      query: 'id',
    })) as ApplicationLossPayeeFinancialUk;

    return lossPayeeFinancialDetailsUk;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export default createLossPayeeFinancialDetailsUk;
