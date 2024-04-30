import { ApplicationLossPayeeFinancialUkVector, TestHelperLossPayeeFinancialUkVectorCreate } from '../types';

/**
 * createLossPayeeFinancialDetailsUkVector
 * create a nominated loss payee financial uk helper
 * Creates a blank ApplicationLossPayeeFinancialUkVector.
 * @param {Context} context: KeystoneJS context API
 * @param {Object} data: Update object
 * @returns {ApplicationLossPayeeFinancialUkVector} Created ApplicationLossPayeeFinancialUkVector
 */
const createLossPayeeFinancialDetailsUkVector = async ({ context, data = {} }: TestHelperLossPayeeFinancialUkVectorCreate) => {
  try {
    console.info('Creating a loss payee financial uk vector (test helpers)');
    const lossPayeeFinancialDetailsUk = (await context.query.LossPayeeFinancialUkVector.createOne({
      data,
      query: 'id',
    })) as ApplicationLossPayeeFinancialUkVector;

    return lossPayeeFinancialDetailsUk;
  } catch (err) {
    console.error('Error creating a loss payee financial uk vector (test helpers) %O', err);
    return err;
  }
};

export default createLossPayeeFinancialDetailsUkVector;
