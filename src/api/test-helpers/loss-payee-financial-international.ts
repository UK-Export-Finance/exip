import { ApplicationLossPayeeFinancialInternational, TestHelperCreate } from '../types';

/**
 * createLossPayeeFinancialDetailsInternational
 * create a nominated loss payee financial details international helper
 * Creates a blank ApplicationLossPayeeFinancialInternational.
 * @param {Object} KeystoneJS context API
 * @returns {ApplicationLossPayeeFinancialInternational} Created ApplicationLossPayeeFinancialInternational
 */
const createLossPayeeFinancialDetailsInternational = async ({ context }: TestHelperCreate) => {
  try {
    console.info('Creating a loss payee financial details international (test helpers)');
    const lossPayeeFinancialDetailsInternational = (await context.query.LossPayeeFinancialInternational.createOne({
      data: {},
      query: 'id',
    })) as ApplicationLossPayeeFinancialInternational;

    return lossPayeeFinancialDetailsInternational;
  } catch (err) {
    console.error('Error creating a loss payee financial details international %O', err);
    return err;
  }
};

export default createLossPayeeFinancialDetailsInternational;
