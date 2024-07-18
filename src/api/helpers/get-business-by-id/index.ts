import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * getBusinessById
 * Get a business by ID
 * @param {Context} context: KeystoneJS context API
 * @param {String} id: Business ID
 * @returns {Promise<ApplicationBusiness>}
 */
const getBusinessById = async (context: Context, id: string) => {
  try {
    console.info(`Getting business by ID ${id}`);

    const business = await context.db.Business.findOne({
      where: { id },
    });

    return business;
  } catch (err) {
    console.error(`Getting business by ID ${id} %O`, err);

    throw new Error(`Error Getting business by ID ${id} ${err}`);
  }
};

export default getBusinessById;
