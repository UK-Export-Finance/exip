import createABuyerTradingHistory from '.';
import { Context, Application, ApplicationBuyer } from '../../types';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import applicationHelpers from '../../test-helpers/applications';
import buyerHelpers from '../../test-helpers/buyers';
import { GBP } from '../../constants';

const invalidId = 'invalid-id';

const assertError = (err) => {
  const errorString = String(err);

  expect(errorString.includes('Creating a buyer trading history')).toEqual(true);
};

describe('helpers/create-a-buyer-trading-history', () => {
  let context: Context;
  let buyer: ApplicationBuyer;
  let applicationId: string;

  beforeAll(async () => {
    context = getKeystoneContext();

    const application = (await applicationHelpers.create({ context, data: {} })) as Application;

    applicationId = application.id;

    buyer = (await buyerHelpers.create({ context, data: {} })) as ApplicationBuyer;
  });

  test('it should return a buyer trading history with respective IDs', async () => {
    const result = await createABuyerTradingHistory(context, buyer.id, applicationId);

    expect(result).toBeDefined();
    expect(typeof result.id).toEqual('string');
    expect(result.id.length).toBeGreaterThan(0);
  });

  test('it should return empty buyerTradingAddress fields with default currencyCode', async () => {
    const result = await createABuyerTradingHistory(context, buyer.id, applicationId);

    expect(result.exporterHasTradedWithBuyer).toEqual(null);
    expect(result.currencyCode).toEqual(GBP);
    expect(result.outstandingPayments).toEqual(null);
    expect(result.failedPayments).toEqual(null);
  });

  describe('when an invalid buyer ID is passed', () => {
    test('it should throw an error', async () => {
      try {
        await createABuyerTradingHistory(context, invalidId, applicationId);
      } catch (err) {
        assertError(err);
      }
    });
  });

  describe('when an invalid application ID is passed', () => {
    test('it should throw an error', async () => {
      try {
        await createABuyerTradingHistory(context, buyer.id, invalidId);
      } catch (err) {
        assertError(err);
      }
    });
  });

  describe('when creation is not successful', () => {
    test('it should throw an error', async () => {
      try {
        // pass empty context object to force an error
        await createABuyerTradingHistory({}, buyer.id, applicationId);
      } catch (err) {
        assertError(err);
      }
    });
  });
});
