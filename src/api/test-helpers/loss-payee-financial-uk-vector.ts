import { ApplicationLossPayeeFinancialUkVector, TestHelperCreate } from '../types';

/**
 * createLossPayeeFinancialDetailsUkVector
 * create a nominated loss payee financial uk helper
 * Creates a blank ApplicationLossPayeeFinancialUkVector.
 * @param {Object} KeystoneJS context API
 * @returns {ApplicationLossPayeeFinancialUkVector} Created ApplicationLossPayeeFinancialUkVector
 */
const createLossPayeeFinancialDetailsUkVector = async ({ context }: TestHelperCreate) => {
  try {
    console.info('Creating a loss payee financial uk vector (test helpers)');
    const lossPayeeFinancialDetailsUk = (await context.query.LossPayeeFinancialUkVector.createOne({
      data: {},
      query: 'id',
    })) as ApplicationLossPayeeFinancialUkVector;

    return lossPayeeFinancialDetailsUk;
  } catch (err) {
    console.error('Error creating a loss payee financial uk vector (test helpers) %O', err);
    return err;
  }
};

export default createLossPayeeFinancialDetailsUkVector;
