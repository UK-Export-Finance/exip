import createALossPayeeFinancialInternational from '../create-a-loss-payee-financial-international';
import createALossPayeeFinancialUk from '../create-a-loss-payee-financial-uk';
import { ApplicationNominatedLossPayee, Context } from '../../types';

/**
 * createANominatedLossPayee
 * 1) Create a "nominated loss payee" with an application and financial relationships
 * 2) Create a "loss payee financial international" relationship
 * 3) Create a "loss payee financial UK" relationship
 * @param {Context} context: KeystoneJS context API
 * @param {String} applicationId: Application ID
 * @returns {Promise<Object>} Created Nominated loss payee
 */
const createANominatedLossPayee = async (context: Context, applicationId: string): Promise<ApplicationNominatedLossPayee> => {
  console.info('Creating a nominated loss payee for %s', applicationId);

  try {
    const nominatedLossPayee = await context.db.NominatedLossPayee.createOne({
      data: {
        application: {
          connect: { id: applicationId },
        },
      },
    });

    await createALossPayeeFinancialInternational(context, nominatedLossPayee.id);
    await createALossPayeeFinancialUk(context, nominatedLossPayee.id);

    return nominatedLossPayee;
  } catch (error) {
    console.error('Error creating a nominated loss payee for %O', error);

    throw new Error(`Creating a nominated loss payee for ${error}`);
  }
};

export default createANominatedLossPayee;
