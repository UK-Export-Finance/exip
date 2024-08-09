import { ApplicationLossPayeeFinancialInternationalVector, TestHelperLossPayeeFinancialInternationalVectorCreate } from '../types';

/**
 * createLossPayeeFinancialDetailsInternationalVector
 * create a nominated loss payee financial international helper
 * Create an empty ApplicationLossPayeeFinancialInternationalVector.
 * @param {Context} context: KeystoneJS context API
 * @param {Object} data: Update object
 * @returns {ApplicationLossPayeeFinancialInternationalVector} Created ApplicationLossPayeeFinancialInternationalVector
 */
const createLossPayeeFinancialDetailsInternationalVector = async ({ context, data = {} }: TestHelperLossPayeeFinancialInternationalVectorCreate) => {
  try {
    console.info('Creating a loss payee financial international vector (test helpers)');

    const lossPayeeFinancialDetailsInternational = (await context.query.LossPayeeFinancialInternationalVector.createOne({
      data,
      query: 'id',
    })) as ApplicationLossPayeeFinancialInternationalVector;

    return lossPayeeFinancialDetailsInternational;
  } catch (error) {
    console.error('Error creating a loss payee financial international vector (test helpers) %O', error);

    return error;
  }
};

export default createLossPayeeFinancialDetailsInternationalVector;
