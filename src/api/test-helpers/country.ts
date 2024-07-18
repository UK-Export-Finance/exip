/**
 * create country test helper
 * Create a country
 * @param {Context} KeystoneJS context API, country data
 * @returns {Object} Created country
 */
const create = async (context: Context) => {
  try {
    console.info('Creating a country (test helpers)');

    const country = await context.query.Country.createOne();

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
