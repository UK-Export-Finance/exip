import createABuyer from '.';
import { mockCountries } from '../../test-mocks';
import { Application, Context } from '../../types';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import getCountryByField from '../get-country-by-field';
import applications from '../../test-helpers/applications';

const invalidId = 'invalid-id';

const assertError = (err) => {
  const errorString = String(err);

  expect(errorString.includes('Creating a buyer')).toEqual(true);
};

describe('helpers/create-a-buyer', () => {
  let context: Context;
  let application: Application;
  let country: object;

  beforeAll(async () => {
    context = getKeystoneContext();

    application = (await applications.create({ context, data: {} })) as Application;

    const countryIsoCode = mockCountries[0].isoCode;

    country = await getCountryByField(context, 'isoCode', countryIsoCode);
  });

  test('it should return a buyer with ID', async () => {
    const result = await createABuyer(context, country.id, application.id);

    expect(result.id).toBeDefined();
    expect(typeof result.id).toEqual('string');
    expect(result.id.length).toBeGreaterThan(0);
  });

  test('it should return empty buyer fields', async () => {
    const result = await createABuyer(context, country.id, application.id);

    expect(result.address).toEqual('');
    expect(result.applicationId).toEqual(application.id);
    expect(result.canContactBuyer).toEqual(null);
    expect(result.companyOrOrganisationName).toEqual('');
    expect(result.contactEmail).toEqual('');
    expect(result.contactFirstName).toEqual('');
    expect(result.contactLastName).toEqual('');
    expect(result.contactPosition).toEqual('');
    expect(result.countryId).toEqual(country.id);
    expect(result.exporterHasTradedWithBuyer).toEqual(null);
    expect(result.exporterIsConnectedWithBuyer).toEqual(null);
    expect(result.registrationNumber).toEqual('');
    expect(result.website).toEqual('');
  });

  describe('when an invalid country ID is passed', () => {
    test('it should throw an error', async () => {
      try {
        await createABuyer(context, invalidId, application.id);
      } catch (err) {
        assertError(err);
      }
    });
  });

  describe('when an invalid application ID is passed', () => {
    test('it should throw an error', async () => {
      try {
        await createABuyer(context, country.id, invalidId);
      } catch (err) {
        assertError(err);
      }
    });
  });

  describe('when creation is not successful', () => {
    test('it should throw an error', async () => {
      try {
        // pass empty context object to force an error
        await createABuyer({}, country.id, application.id);
      } catch (err) {
        assertError(err);
      }
    });
  });
});
