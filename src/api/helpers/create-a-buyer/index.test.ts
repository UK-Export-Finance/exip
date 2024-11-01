import createABuyer from '.';
import { mockCountries, mockInvalidId } from '../../test-mocks';
import { Context } from '../../types';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import getCountryByField from '../get-country-by-field';

const assertError = (error) => {
  const errorString = String(error);

  expect(errorString.includes('Creating a buyer')).toEqual(true);
};

describe('helpers/create-a-buyer', () => {
  let context: Context;
  let country: object;

  beforeAll(async () => {
    context = getKeystoneContext();

    const countryIsoCode = mockCountries[0].isoCode;

    country = await getCountryByField(context, 'isoCode', countryIsoCode);
  });

  test('it should return a buyer', async () => {
    const result = await createABuyer(context, country.id);

    expect(result).toBeDefined();
    expect(typeof result.id).toEqual('string');
    expect(result.id.length).toBeGreaterThan(0);
  });

  test('it should return empty buyer fields', async () => {
    const result = await createABuyer(context, country.id);

    expect(result.address).toEqual('');
    expect(result.companyOrOrganisationName).toEqual('');
    expect(result.countryId).toEqual(country.id);
    expect(result.registrationNumber).toEqual('');
    expect(result.website).toEqual('');
  });

  describe('when an invalid country ID is passed', () => {
    test('it should throw an error', async () => {
      try {
        await createABuyer(context, mockInvalidId);
      } catch (error) {
        assertError(error);
      }
    });
  });

  describe('when creation is not successful', () => {
    test('it should throw an error', async () => {
      try {
        // pass empty context object to force an error
        await createABuyer({}, country.id);
      } catch (error) {
        assertError(error);
      }
    });
  });
});
