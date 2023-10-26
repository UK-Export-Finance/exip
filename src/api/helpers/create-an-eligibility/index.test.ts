import creatAnEligibility from '.';
import { mockCountries } from '../../test-mocks';
import { Application, Context } from '../../types';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import getCountryByField from '../get-country-by-field';
import applications from '../../test-helpers/applications';

const invalidId = 'invalid-id';

const assertError = (err) => {
  const errorString = String(err);

  expect(errorString.includes('Creating an eligibility')).toEqual(true);
};

describe('helpers/create-an-eligibility', () => {
  let context: Context;
  let application: Application;
  let country: object;

  beforeAll(async () => {
    context = getKeystoneContext();

    application = (await applications.create({ context, data: {} })) as Application;

    const countryIsCode = mockCountries[0].isoCode;

    country = await getCountryByField(context, 'isoCode', countryIsCode);
  });

  test('it should return a eligibility with ID', async () => {
    const result = await creatAnEligibility(context, country.id, application.id);

    expect(result.id).toBeDefined();
    expect(typeof result.id).toEqual('string');
    expect(result.id.length).toBeGreaterThan(0);
  });

  test('it should return empty eligibility fields', async () => {
    const result = await creatAnEligibility(context, country.id, application.id);

    expect(result.applicationId).toEqual(application.id);
    expect(result.buyerCountryId).toEqual(country.id);
    expect(result.hasMinimumUkGoodsOrServices).toEqual(false);
    expect(result.validExporterLocation).toEqual(false);
    expect(result.hasCompaniesHouseNumber).toEqual(false);
    expect(result.wantCoverOverMaxAmount).toEqual(false);
    expect(result.wantCoverOverMaxPeriod).toEqual(false);
  });

  describe('when an invalid country ID is passed', () => {
    test('it should throw an error', async () => {
      try {
        await creatAnEligibility(context, invalidId, application.id);
      } catch (err) {
        assertError(err);
      }
    });
  });

  describe('when an invalid application ID is passed', () => {
    test('it should throw an error', async () => {
      try {
        await creatAnEligibility(context, country.id, invalidId);
      } catch (err) {
        assertError(err);
      }
    });
  });

  describe('when creation is not successful', () => {
    test('it should throw an error', async () => {
      try {
        // pass empty context object to force an error
        await creatAnEligibility({}, country.id, application.id);
      } catch (err) {
        assertError(err);
      }
    });
  });
});
