import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * getCompanyById
 * Get a company by ID
 * @param {Context} context: KeystoneJS context API
 * @param {String} id: Company ID
 * @returns {Promise<ApplicationCompany>}
 */
const getCompanyById = async (context: Context, id: string) => {
  try {
    console.info('Getting company by ID %s', id);

    const company = await context.db.Company.findOne({
      where: { id },
    });

    return company;
  } catch (error) {
    console.error('Getting company by ID %s %o', id, error);

    throw new Error(`Error Getting company by ID ${id} ${error}`);
  }
};

export default getCompanyById;
