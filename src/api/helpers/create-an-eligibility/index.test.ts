import creatAnEligibility from '.';
import { mockCountries, mockInvalidId } from '../../test-mocks';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import getCountryByField from '../get-country-by-field';
import coverPeriodTestHelper from '../../test-helpers/cover-period';
import totalContractValueTestHelper from '../../test-helpers/total-contract-value';
import applications from '../../test-helpers/applications';
import { Application, Context, CoverPeriod, TotalContractValue } from '../../types';

const assertError = (error) => {
  const errorString = String(error);

  expect(errorString.includes('Creating an eligibility')).toEqual(true);
};

describe('helpers/create-an-eligibility', () => {
  let context: Context;
  let application: Application;
  let country: object;
  let coverPeriod: CoverPeriod;
  let totalContractValue: TotalContractValue;

  beforeAll(async () => {
    context = getKeystoneContext();

    application = (await applications.create({ context })) as Application;

    const countryIsCode = mockCountries[0].isoCode;

    country = await getCountryByField(context, 'isoCode', countryIsCode);

    coverPeriod = await coverPeriodTestHelper.create(context);

    totalContractValue = await totalContractValueTestHelper.create(context);
  });

  test('it should return a eligibility with ID', async () => {
    const result = await creatAnEligibility(context, country.id, application.id, coverPeriod.id, totalContractValue.id);

    expect(result.id).toBeDefined();
    expect(typeof result.id).toEqual('string');
    expect(result.id.length).toBeGreaterThan(0);
  });

  test('it should return empty eligibility fields', async () => {
    const result = await creatAnEligibility(context, country.id, application.id, coverPeriod.id, totalContractValue.id);

    expect(result.applicationId).toEqual(application.id);
    expect(result.buyerCountryId).toEqual(country.id);
    expect(result.totalContractValueId).toEqual(totalContractValue.id);
    expect(result.hasMinimumUkGoodsOrServices).toEqual(false);
    expect(result.validExporterLocation).toEqual(false);
    expect(result.hasCompaniesHouseNumber).toEqual(false);
    expect(result.otherPartiesInvolved).toEqual(false);
    expect(result.paidByLetterOfCredit).toEqual(false);
    expect(result.isPartyToConsortium).toEqual(false);
    expect(result.isMemberOfAGroup).toEqual(false);
  });

  describe('when an invalid country ID is passed', () => {
    test('it should throw an error', async () => {
      try {
        await creatAnEligibility(context, mockInvalidId, application.id, coverPeriod.id, totalContractValue.id);
      } catch (error) {
        assertError(error);
      }
    });
  });

  describe('when an invalid application ID is passed', () => {
    test('it should throw an error', async () => {
      try {
        await creatAnEligibility(context, country.id, mockInvalidId, coverPeriod.id, totalContractValue.id);
      } catch (error) {
        assertError(error);
      }
    });
  });

  describe('when an invalid coverPeriod ID is passed', () => {
    test('it should throw an error', async () => {
      try {
        await creatAnEligibility(context, country.id, application.id, mockInvalidId, totalContractValue.id);
      } catch (error) {
        assertError(error);
      }
    });
  });

  describe('when an invalid totalContractValue ID is passed', () => {
    test('it should throw an error', async () => {
      try {
        await creatAnEligibility(context, country.id, application.id, coverPeriod.id, mockInvalidId);
      } catch (error) {
        assertError(error);
      }
    });
  });

  describe('when creation is not successful', () => {
    test('it should throw an error', async () => {
      try {
        // pass empty context object to force an error
        await creatAnEligibility({}, country.id, application.id, coverPeriod.id, totalContractValue.id);
      } catch (error) {
        assertError(error);
      }
    });
  });
});
