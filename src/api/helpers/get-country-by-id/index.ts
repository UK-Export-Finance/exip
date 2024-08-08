import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * getCountryById
 * Get a country by ID
 * @param {Context} context: KeystoneJS context API
 * @param {String} id: Country ID
 * @returns {Promise<Country>}
 */
const getCountryById = async (context: Context, id: string) => {
  try {
    console.info(`Getting country by ID ${id}`);

    const country = await context.db.Country.findOne({
      where: { id },
    });

    return country;
  } catch (error) {
    console.error(`Getting country by ID ${id} %O`, error);

    throw new Error(`Error Getting country by ID ${id} ${error}`);
  }
};

export default getCountryById;
