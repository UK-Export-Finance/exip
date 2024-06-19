import { Context } from '.keystone/types';

/**
 * createACompanyDifferentTradingAddress
 * Create a company different trading address with company relationships.
 * @param {Context} KeystoneJS context API
 * @param {String} Company ID
 * @returns {Promise<Object>} Created company different trading address
 */
const createACompanyDifferentTradingAddress = async (context: Context, companyId: string) => {
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
    console.error('Error creating a company different trading address %O', err);

    throw new Error(`Creating a company different trading address ${err}`);
  }
};

export default createACompanyDifferentTradingAddress;
