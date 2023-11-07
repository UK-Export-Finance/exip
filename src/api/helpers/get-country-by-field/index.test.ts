import getCountryByField from '.';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import mockCountries from '../../test-mocks/mock-countries';
import { Context, Country } from '../../types';

describe('helpers/get-country-by-field', () => {
  let context: Context;
  let country: Country;

  const [mockCountry] = mockCountries;

  const field = 'isoCode';
  const value = mockCountry.isoCode;

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    // wipe the table so we have a clean slate.
    const countries = await context.query.Country.findMany();

    if (countries.length) {
      await context.query.Country.deleteMany({
        where: countries,
      });
    }

    // create a new country
    country = (await context.query.Country.createOne({
      data: mockCountry,
      query: 'id isoCode name',
    })) as Country;
  });

  it('should return a country by ID', async () => {
    const result = (await getCountryByField(context, field, value)) as Country;

    expect(result.id).toEqual(country.id);
    expect(result.isoCode).toEqual(country.isoCode);
    expect(result.name).toEqual(country.name);
  });

  describe('when a country is not found', () => {
    it('should throw an error', async () => {
      try {
        await getCountryByField(context, field, 'invalidIsoCode');
      } catch (err) {
        const errorMessage = 'Getting country by field/value';

        const newError = new Error(errorMessage);

        const expected = new Error(`${errorMessage} ${newError}`);
        expect(err).toEqual(expected);
      }
    });
  });
});
