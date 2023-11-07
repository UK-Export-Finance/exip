import { Context, Country } from '../../types';

const getCountryByField = async (context: Context, field: string, value: string): Promise<Country | boolean> => {
  try {
    console.info('Getting country by field/value');

    /**
     * Get a country by a particular field and value.
     * NOTE: Keystone has a limitation where you can't findOne by a field that is NOT the id.
     * Therefore we have to use findMany, which has a performance impact.
     * Because this is low volume service, there is no need to improve this.
     * However if volumes increase dramatically we will need to improve this.
     */
    const countriesArray = await context.db.Country.findMany({
      where: {
        [field]: { equals: value },
      },
      take: 1,
    });

    // ensure that we have found a country with the requested field/value
    if (!countriesArray?.length || !countriesArray[0]) {
      console.info('Getting country by field - no country exists with the provided field/value');

      return false;
    }

    const country = countriesArray[0] as Country;

    return country;
  } catch (err) {
    console.error('Error getting country by field/value %O', err);
    throw new Error(`Getting country by field/value ${err}`);
  }
};

export default getCountryByField;
