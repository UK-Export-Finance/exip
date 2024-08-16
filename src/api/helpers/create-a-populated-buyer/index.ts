import createABuyerTradingHistory from '../create-a-buyer-trading-history';
import createABuyerContact from '../create-a-buyer-contact';
import createABuyerRelationship from '../create-a-buyer-relationship';
import { Context } from '../../types';

/**
 * createAPopulatedBuyer
 * Create a populated buyer with:
 * 1) A country relationship
 * 2) An application relationship
 * 3) A Buyer trading history and relationship
 * @param {Context} context: KeystoneJS context API
 * @param {String} countryId: Country ID
 * @param {String} applicationId: Application ID
 * @returns {Promise<Object>} Created buyer
 */
const createAPopulatedBuyer = async (context: Context, countryId: string, applicationId: string) => {
  console.info('Creating a buyer for %s', applicationId);

  try {
    const buyer = await context.db.Buyer.createOne({
      data: {
        country: {
          connect: { id: countryId },
        },
        application: {
          connect: { id: applicationId },
        },
      },
    });

    // Create a buyer trading address with buyer relationships
    const buyerTradingHistory = await createABuyerTradingHistory(context, buyer.id, applicationId);

    // Create a buyer relationship row with buyer relationships
    const buyerRelationship = await createABuyerRelationship(context, buyer.id, applicationId);

    // Create a buyer contact with buyer relationship
    const buyerContact = await createABuyerContact(context, buyer.id, applicationId);

    return {
      ...buyer,
      buyerTradingHistory,
      relationship: buyerRelationship,
      buyerContact,
    };
  } catch (error) {
    console.error('Error creating a populated buyer %O', error);

    throw new Error(`Creating a populated buyer ${error}`);
  }
};

export default createAPopulatedBuyer;
