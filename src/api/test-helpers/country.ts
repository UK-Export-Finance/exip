import { Context } from '.keystone/types'; // eslint-disable-line
import { mockCountries } from '../test-mocks';

/**
 * create country test helper
 * Create a country
 * @param {Context} KeystoneJS context API, country data
 * @returns {Object} Created country
 */
const create = async (context: Context) => {
  try {
    console.info('Creating a country (test helpers)');

    const country = await context.db.Country.createOne({
      data: {
        isoCode: mockCountries[0].isoCode,
        name: mockCountries[0].name,
      },
    });

    return country;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const country = {
  create,
};

export default country;
