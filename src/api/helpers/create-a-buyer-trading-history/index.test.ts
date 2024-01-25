import createABuyerTradingHistory from '.';
import { Application, Context } from '../../types';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import applications from '../../test-helpers/applications';
import { GBP } from '../../constants';

const invalidId = 'invalid-id';

const assertError = (err) => {
  const errorString = String(err);

  expect(errorString.includes('Creating a buyer trading history')).toEqual(true);
};

describe('helpers/create-a-buyer-trading-history', () => {
  let context: Context;
  let application: Application;

  beforeAll(async () => {
    context = getKeystoneContext();

    application = (await applications.create({ context, data: {} })) as Application;
  });

  test('it should return a buyer trading history with respective IDs', async () => {
    const result = await createABuyerTradingHistory(context, application.buyer.id);

    expect(result).toBeDefined();
    expect(typeof result.id).toEqual('string');
    expect(result.id.length).toBeGreaterThan(0);
  });

  test('it should return empty buyerTradingAddress fields', async () => {
    const result = await createABuyerTradingHistory(context, application.buyer.id);

    expect(result.exporterHasTradedWithBuyer).toEqual('');
    expect(result.currencyCode).toEqual(GBP);
    expect(result.outstandingPayments).toEqual(null);
    expect(result.failedPayments).toEqual(null);
  });

  describe('when an invalid application ID is passed', () => {
    test('it should throw an error', async () => {
      try {
        await createABuyerTradingHistory(context, invalidId);
      } catch (err) {
        assertError(err);
      }
    });
  });

  describe('when creation is not successful', () => {
    test('it should throw an error', async () => {
      try {
        // pass empty context object to force an error
        await createABuyerTradingHistory({}, application.buyer.id);
      } catch (err) {
        assertError(err);
      }
    });
  });
});
