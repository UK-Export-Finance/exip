import { Context } from '.keystone/types'; // eslint-disable-line
import { mockCountries } from '../test-mocks';

/**
 * create country test helper
 * Create a country
 * @param {Context} context: KeystoneJS context API, country data
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
  } catch (err) {
    console.error(err);
    return err;
  }
};

const country = {
  create,
};

export default country;
