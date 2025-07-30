import { Context } from '../../types';

/**
 * createABuyer
 * Create a buyer
 * @param {Context} context: KeystoneJS context API
 * @param {string} countryId: Country ID
 * @returns {Promise<object>} Created buyer
 */
const createABuyer = async (context: Context, countryId: string) => {
  console.info('Creating a buyer');

  try {
    const buyer = await context.db.Buyer.createOne({
      data: {
        country: {
          connect: {
            id: countryId,
          },
        },
      },
    });

    return buyer;
  } catch (error) {
    console.error('Error creating a buyer %o', error);

    throw new Error(`Creating a buyer ${error}`);
  }
};

export default createABuyer;
