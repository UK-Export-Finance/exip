import { ApplicationNominatedLossPayee, TestHelperCreate } from '../types';

/**
 * create a nominated loss payee financial uk helper
 * Creates a blank ApplicationLossPayeeFinancialUk.
 * @param {Context} KeystoneJS context API
 * @returns {Object} Created ApplicationNominatedLossPayee
 */
const createNominatedLossPayee = async ({ context }: TestHelperCreate) => {
  try {
    console.info('Creating a nominated loss payee (test helpers)');

    const lossPayee = (await context.query.NominatedLossPayee.createOne({
      data: {},
      query: 'id financialInternational { id } financialUk { id } isAppointed isLocatedInUk isLocatedInternationally name',
    })) as ApplicationNominatedLossPayee;

    return lossPayee;
  } catch (err) {
    console.error('Error creating a nominated loss payee (test helpers) %O', err);
    return err;
  }
};

export default createNominatedLossPayee;
