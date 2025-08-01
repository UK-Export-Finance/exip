import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * getBusinessById
 * Get a business by ID
 * @param {Context} context: KeystoneJS context API
 * @param {string} id: Business ID
 * @returns {Promise<ApplicationBusiness>}
 */
const getBusinessById = async (context: Context, id: string) => {
  try {
    console.info('Getting business by ID %s', id);

    const business = await context.db.Business.findOne({
      where: { id },
    });

    return business;
  } catch (error) {
    console.error('Getting business by ID %s %o', id, error);

    throw new Error(`Error Getting business by ID ${id} ${error}`);
  }
};

export default getBusinessById;
