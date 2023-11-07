import { Context } from '../../types';

/**
 * createABuyer
 * Create a buyer with relationships for:
 * 1) A country
 * 2) An application
 * @param {Object} KeystoneJS context API
 * @param {String} Country ID
 * @param {String} Application ID
 * @returns {Object} Created buyer
 */
const createABuyer = async (context: Context, countryId: string, applicationId: string) => {
  console.info('Creating a buyer for ', applicationId);

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

    return buyer;
  } catch (err) {
    console.error('Error creating a buyer %O', err);

    throw new Error(`Creating a buyer ${err}`);
  }
};

export default createABuyer;
