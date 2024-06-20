import { Context } from '.keystone/types'; // eslint-disable-line
import { Country } from '../../types';

/**
 * getCountries
 * Get countries
 * @param {Context} KeystoneJS context API
 * @returns {Array<Country>}
 */
const getCountries = async (context: Context) => {
  console.info('Getting countries');

  try {
    const countries = (await context.db.Country.findMany()) as Array<Country>;

    return countries;
  } catch (err) {
    console.error('Error getting countries %O', err);
    throw new Error(`Getting countries ${err}`);
  }
};

export default getCountries;
