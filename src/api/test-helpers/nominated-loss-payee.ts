import createLossPayeeFinancialDetailsUk from './loss-payee-financial-uk';
import createLossPayeeFinancialDetailsInternational from './loss-payee-financial-international';
import { ApplicationNominatedLossPayee, ApplicationLossPayeeFinancialUk, ApplicationLossPayeeFinancialInternational, TestHelperCreate } from '../types';

/**
 * create a nominated loss payee financial uk helper
 * Creates a blank ApplicationLossPayeeFinancialUk.
 * @param {Context} KeystoneJS context API
 * @returns {Object} Created ApplicationNominatedLossPayee
 */
const createNominatedLossPayee = async ({ context }: TestHelperCreate) => {
  try {
    console.info('Creating a nominated loss payee (test helpers)');

    const financialUk = (await createLossPayeeFinancialDetailsUk({ context })) as ApplicationLossPayeeFinancialUk;
    const financialInternational = (await createLossPayeeFinancialDetailsInternational({ context })) as ApplicationLossPayeeFinancialInternational;

    const lossPayee = (await context.query.NominatedLossPayee.createOne({
      data: {
        financialUk: {
          connect: {
            id: financialUk.id,
          },
        },
        financialInternational: {
          connect: {
            id: financialInternational.id,
          },
        },
      },
      query:
        'id financialInternational { id iban bicSwiftCode bankAddress vector { bicSwiftCodeVector ibanVector } } financialUk { id accountNumber sortCode bankAddress vector { accountNumberVector sortCodeVector } } isAppointed isLocatedInUk isLocatedInternationally name',
    })) as ApplicationNominatedLossPayee;

    const created = {
      ...lossPayee,
      financialUk,
      financialInternational,
    };

    return created;
  } catch (err) {
    console.error('Error creating a nominated loss payee (test helpers) %O', err);
    return err;
  }
};

export default createNominatedLossPayee;
