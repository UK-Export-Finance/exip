import { Context } from '../../types';

/**
 * createADifferentTradingAddress
 * Create a different trading address with company relationships.
 * @param {Object} KeystoneJS context API
 * @param {Object} Company address data
 * @param {String} Company ID
 * @returns {Object} Created different trading address
 */
const createADifferentTradingAddress = async (context: Context, companyId: string) => {
  console.info('Creating a different trading address for ', companyId);

  try {
    const differentTradingAddress = await context.db.CompanyDifferentTradingAddress.createOne({
      data: {
        company: {
          connect: {
            id: companyId,
          },
        },
      },
    });

    return differentTradingAddress;
  } catch (err) {
    console.error('Error creating a different trading address %O', err);

    throw new Error(`Creating a different trading address ${err}`);
  }
};

export default createADifferentTradingAddress;
