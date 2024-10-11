import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * getCompanyDifferentTradingAddressById
 * Get a company different trading address by ID
 * @param {Context} context: KeystoneJS context API
 * @param {String} id: Company different trading address ID
 * @returns {Promise<ApplicationCompanyDifferentTradingAddress>}
 */
const getCompanyDifferentTradingAddressById = async (context: Context, id: string) => {
  try {
    console.info('Getting company different trading address by ID %s', id);

    const differentTradingAddress = await context.db.CompanyDifferentTradingAddress.findOne({
      where: { id },
    });

    return differentTradingAddress;
  } catch (error) {
    console.error('Getting company different trading address by ID %s %o', id, error);

    throw new Error(`Error Getting company different trading address by ID ${id} ${error}`);
  }
};

export default getCompanyDifferentTradingAddressById;
