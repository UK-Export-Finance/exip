import createABuyer from '.';
import { mockCountries, mockInvalidId } from '../../test-mocks';
import { Application, Context } from '../../types';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import getCountryByField from '../get-country-by-field';
import applications from '../../test-helpers/applications';
import { GBP } from '../../constants';

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

    application = (await applications.create({ context })) as Application;

    const countryIsoCode = mockCountries[0].isoCode;

    country = await getCountryByField(context, 'isoCode', countryIsoCode);
  });

  test('it should return a buyer and buyer trading history with respective IDs', async () => {
    const result = await createABuyer(context, country.id, application.id);

    const { buyerTradingHistory } = result;

    expect(result).toBeDefined();
    expect(buyerTradingHistory).toBeDefined();
    expect(typeof result.id).toEqual('string');
    expect(typeof buyerTradingHistory.id).toEqual('string');
    expect(result.id.length).toBeGreaterThan(0);
    expect(buyerTradingHistory.id.length).toBeGreaterThan(0);
  });

  test('it should return empty buyer fields', async () => {
    const result = await createABuyer(context, country.id, application.id);

    expect(result.address).toEqual('');
    expect(result.applicationId).toEqual(application.id);
    expect(result.companyOrOrganisationName).toEqual('');
    expect(result.countryId).toEqual(country.id);
    expect(result.registrationNumber).toEqual('');
    expect(result.website).toEqual('');
  });

  test('it should return empty buyerTradingAddress fields with default currencyCode', async () => {
    const { buyerTradingHistory } = await createABuyer(context, country.id, application.id);

    expect(buyerTradingHistory.currencyCode).toEqual(GBP);
    expect(buyerTradingHistory.outstandingPayments).toBeNull();
    expect(buyerTradingHistory.failedPayments).toBeNull();
  });

  test('it should return empty buyer relationship fields', async () => {
    const { relationship } = await createABuyer(context, country.id, application.id);

    expect(relationship.exporterIsConnectedWithBuyer).toBeNull();
    expect(relationship.connectionWithBuyerDescription).toEqual('');
    expect(relationship.exporterHasPreviousCreditInsuranceWithBuyer).toBeNull();
    expect(relationship.exporterHasBuyerFinancialAccounts).toBeNull();
    expect(relationship.previousCreditInsuranceWithBuyerDescription).toEqual('');
  });

  test('it should return empty buyerContact fields', async () => {
    const { buyerContact } = await createABuyer(context, country.id, application.id);

    expect(buyerContact.contactFirstName).toEqual('');
    expect(buyerContact.contactLastName).toEqual('');
    expect(buyerContact.contactPosition).toEqual('');
    expect(buyerContact.contactEmail).toEqual('');
    expect(buyerContact.canContactBuyer).toBeNull();
  });

  describe('when an invalid country ID is passed', () => {
    test('it should throw an error', async () => {
      try {
        await createABuyer(context, mockInvalidId, application.id);
      } catch (err) {
        assertError(err);
      }
    });
  });

  describe('when an invalid application ID is passed', () => {
    test('it should throw an error', async () => {
      try {
        await createABuyer(context, country.id, mockInvalidId);
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
