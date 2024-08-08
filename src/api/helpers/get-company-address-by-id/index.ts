import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * getCompanyAddressById
 * Get a company address by ID
 * @param {Context} context: KeystoneJS context API
 * @param {String} id: Company address ID
 * @returns {Promise<ApplicationCompanyAddress>}
 */
const getCompanyAddressById = async (context: Context, id: string) => {
  try {
    console.info(`Getting company address by ID ${id}`);

    const companyAddress = await context.db.CompanyAddress.findOne({
      where: { id },
    });

    return companyAddress;
  } catch (error) {
    console.error(`Getting company address by ID ${id} %O`, error);

    throw new Error(`Error Getting company address by ID ${id} ${error}`);
  }
};

export default getCompanyAddressById;
