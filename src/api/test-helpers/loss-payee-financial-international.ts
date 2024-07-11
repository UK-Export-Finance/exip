import createLossPayeeFinancialDetailsInternationalVector from './loss-payee-financial-international-vector';
import { ApplicationLossPayeeFinancialInternational, TestHelperCreate } from '../types';

/**
 * createLossPayeeFinancialDetailsInternational
 * create a nominated loss payee financial international helper
 * Creates a blank ApplicationLossPayeeFinancialInternational.
 * @param {Context} context: KeystoneJS context API
 * @returns {ApplicationLossPayeeFinancialInternational} Created ApplicationLossPayeeFinancialInternational
 */
const createLossPayeeFinancialDetailsInternational = async ({ context }: TestHelperCreate) => {
  try {
    console.info('Creating a loss payee financial international (test helpers)');

    const financialInternationalVector = await createLossPayeeFinancialDetailsInternationalVector({ context });

    const lossPayeeFinancialDetailsInternational = (await context.query.LossPayeeFinancialInternational.createOne({
      data: {
        vector: {
          connect: {
            id: financialInternationalVector.id,
          },
        },
      },
      query: 'id bicSwiftCode iban bankAddress vector { bicSwiftCodeVector ibanVector }',
    })) as ApplicationLossPayeeFinancialInternational;

    return lossPayeeFinancialDetailsInternational;
  } catch (err) {
    console.error('Error creating a loss payee financial international (test helpers) %O', err);
    return err;
  }
};

export default createLossPayeeFinancialDetailsInternational;
