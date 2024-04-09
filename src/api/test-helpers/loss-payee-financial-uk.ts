import { ApplicationLossPayeeFinancialUk, TestHelperCreate } from '../types';

/**
 * create company test helper
 * Creates a blank company.
 * @param {Object} KeystoneJS context API
 * @returns {Object} Created company id
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
