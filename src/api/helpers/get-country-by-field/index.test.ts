import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import getCountryByField from '.';
import baseConfig from '../../keystone';
import mockCountries from '../../test-mocks/mock-countries';
import { Country } from '../../types';
import { Context } from '.keystone/types'; // eslint-disable-line

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

dotenv.config();

const context = getContext(config, PrismaModule) as Context;

describe('helpers/get-country-by-field', () => {
  const mockCountry = mockCountries[0];

  let country: Country;

  const field = 'isoCode';
  const value = mockCountry.isoCode;

  beforeEach(async () => {
    // wipe the table so we have a clean slate.
    const countries = await context.query.Country.findMany();

    await context.query.Country.deleteMany({
      where: countries,
    });

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
    beforeEach(async () => {
      // delete the country so it will not be found
      await context.query.Country.deleteOne({
        where: { id: country.id },
      });
    });

    it('should throw an error', async () => {
      try {
        await getCountryByField(context, field, value);
      } catch (err) {
        const errorMessage = 'Getting country by field/value';

        const newError = new Error(errorMessage);

        const expected = new Error(`${errorMessage} ${newError}`);
        expect(err).toEqual(expected);
      }
    });
  });
});
