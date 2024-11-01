import createABuyerTradingHistory from '.';
import { Context, Application, ApplicationBuyer } from '../../types';
import { mockInvalidId } from '../../test-mocks';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import applicationHelpers from '../../test-helpers/applications';
import buyerHelpers from '../../test-helpers/buyer';
import { GBP } from '../../constants';

const assertError = (error) => {
  const errorString = String(error);

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

    buyer = (await buyerHelpers.create(context)) as ApplicationBuyer;
  });

  test('it should return a buyer trading history with respective IDs', async () => {
    const result = await createABuyerTradingHistory(context, buyer.id, applicationId);

    expect(result).toBeDefined();
    expect(typeof result.id).toEqual('string');
    expect(result.id.length).toBeGreaterThan(0);
  });

  test('it should return empty buyerTradingAddress fields with default currencyCode', async () => {
    const result = await createABuyerTradingHistory(context, buyer.id, applicationId);

    expect(result.exporterHasTradedWithBuyer).toBeNull();
    expect(result.currencyCode).toEqual(GBP);
    expect(result.outstandingPayments).toBeNull();
    expect(result.failedPayments).toBeNull();
  });

  describe('when an invalid buyer ID is passed', () => {
    test('it should throw an error', async () => {
      try {
        await createABuyerTradingHistory(context, mockInvalidId, applicationId);
      } catch (error) {
        assertError(error);
      }
    });
  });

  describe('when an invalid application ID is passed', () => {
    test('it should throw an error', async () => {
      try {
        await createABuyerTradingHistory(context, buyer.id, mockInvalidId);
      } catch (error) {
        assertError(error);
      }
    });
  });

  describe('when creation is not successful', () => {
    test('it should throw an error', async () => {
      try {
        // pass empty context object to force an error
        await createABuyerTradingHistory({}, buyer.id, applicationId);
      } catch (error) {
        assertError(error);
      }
    });
  });
});
