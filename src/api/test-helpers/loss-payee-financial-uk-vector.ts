import { ApplicationLossPayeeFinancialUkVector, TestHelperLossPayeeFinancialUkVectorCreate } from '../types';

/**
 * createLossPayeeFinancialDetailsUkVector
 * create a nominated loss payee financial uk helper
 * Create an empty ApplicationLossPayeeFinancialUkVector.
 * @param {Context} context: KeystoneJS context API
 * @param {object} data: Update object
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
  } catch (error) {
    console.error('Error creating a loss payee financial uk vector (test helpers) %o', error);

    return error;
  }
};

export default createLossPayeeFinancialDetailsUkVector;
