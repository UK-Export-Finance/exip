import { Context } from '.keystone/types'; // eslint-disable-line
import { Country } from '../../types';

/**
 * getCountries
 * Get countries
 * @param {Context} context: KeystoneJS context API
 * @returns {Array<Country>}
 */
const getCountries = async (context: Context) => {
  console.info('Getting countries');

  try {
    const countries = (await context.db.Country.findMany()) as Array<Country>;

    return countries;
  } catch (error) {
    console.error('Error getting countries %o', error);

    throw new Error(`Getting countries ${error}`);
  }
};

export default getCountries;
