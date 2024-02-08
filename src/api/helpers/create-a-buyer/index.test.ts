import createABuyer from '.';
import { mockCountries } from '../../test-mocks';
import { Application, Context } from '../../types';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import getCountryByField from '../get-country-by-field';
import applications from '../../test-helpers/applications';
import { GBP } from '../../constants';

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

  test('it should return a buyer and buyer trading history with respective IDs', async () => {
    const result = await createABuyer(context, country.id, application.id);

    const { buyer, buyerTradingHistory } = result;

    expect(buyer).toBeDefined();
    expect(buyerTradingHistory).toBeDefined();
    expect(typeof buyer.id).toEqual('string');
    expect(typeof buyerTradingHistory.id).toEqual('string');
    expect(buyer.id.length).toBeGreaterThan(0);
    expect(buyerTradingHistory.id.length).toBeGreaterThan(0);
  });

  test('it should return empty buyer fields', async () => {
    const result = await createABuyer(context, country.id, application.id);
    const { buyer } = result;

    expect(buyer.address).toEqual('');
    expect(buyer.applicationId).toEqual(application.id);
    expect(buyer.canContactBuyer).toEqual(null);
    expect(buyer.companyOrOrganisationName).toEqual('');
    expect(buyer.contactEmail).toEqual('');
    expect(buyer.contactFirstName).toEqual('');
    expect(buyer.contactLastName).toEqual('');
    expect(buyer.contactPosition).toEqual('');
    expect(buyer.countryId).toEqual(country.id);
    expect(buyer.exporterIsConnectedWithBuyer).toEqual(null);
    expect(buyer.registrationNumber).toEqual('');
    expect(buyer.website).toEqual('');
  });

  test('it should return empty buyerTradingAddress fields with default currencyCode', async () => {
    const result = await createABuyer(context, country.id, application.id);
    const { buyerTradingHistory } = result;

    expect(buyerTradingHistory.currencyCode).toEqual(GBP);
    expect(buyerTradingHistory.outstandingPayments).toBeNull();
    expect(buyerTradingHistory.failedPayments).toBeNull();
  });

  test('it should return empty buyerRelationship fields', async () => {
    const result = await createABuyer(context, country.id, application.id);
    const { buyerRelationship } = result;

    expect(buyerRelationship.exporterIsConnectedWithBuyer).toBeNull();
    expect(buyerRelationship.connectionWithBuyerDescription).toBeNull();
    expect(buyerRelationship.exporterHasPreviousCreditInsuranceWithBuyer).toBeNull();
    expect(buyerRelationship.exporterHasBuyerFinancialAccounts).toBeNull();
    expect(buyerRelationship.previousCreditInsuranceWithBuyerDescription).toBeNull();
  });

  test('it should return empty buyerContact fields', async () => {
    const result = await createABuyer(context, country.id, application.id);
    const { buyerContact } = result;

    expect(buyerContact.contactFirstName).toBeNull();
    expect(buyerContact.contactLastName).toBeNull();
    expect(buyerContact.contactPosition).toBeNull();
    expect(buyerContact.contactEmail).toBeNull();
    expect(buyerContact.canContactBuyer).toBeNull();
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
