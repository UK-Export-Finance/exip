import createAPolicy from '.';
import { APPLICATION } from '../../constants';
import { Application, Context } from '../../types';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import applications from '../../test-helpers/applications';

const invalidId = 'invalid-id';

const assertError = (err) => {
  const errorString = String(err);

  expect(errorString.includes('Creating a policy')).toEqual(true);
};

describe('helpers/create-a-policy', () => {
  let context: Context;
  let application: Application;

  beforeAll(async () => {
    context = getKeystoneContext();

    application = (await applications.create({ context, data: {} })) as Application;
  });

  test('it should return a policy with ID', async () => {
    const result = await createAPolicy(context, application.id);

    expect(result.id).toBeDefined();
    expect(typeof result.id).toEqual('string');
    expect(result.id.length).toBeGreaterThan(0);
  });

  test('it should return empty policy fields and default needPreCreditPeriodCover', async () => {
    const result = await createAPolicy(context, application.id);

    expect(result.applicationId).toEqual(application.id);
    expect(result.needPreCreditPeriodCover).toEqual(APPLICATION.DEFAULT_NEED_PRE_CREDIT_PERIOD_COVER);
    expect(result.policyType).toEqual(null);
    expect(result.requestedStartDate).toEqual(null);
    expect(result.contractCompletionDate).toEqual(null);
    expect(result.totalValueOfContract).toEqual(null);
    expect(result.creditPeriodWithBuyer).toEqual('');
    expect(result.policyCurrencyCode).toEqual('');
    expect(result.totalMonthsOfCover).toEqual(null);
    expect(result.totalSalesToBuyer).toEqual(null);
    expect(result.maximumBuyerWillOwe).toEqual(null);
  });

  describe('when an invalid application ID is passed', () => {
    test('it should throw an error', async () => {
      try {
        await createAPolicy(context, invalidId);
      } catch (err) {
        assertError(err);
      }
    });
  });

  describe('when creation is not successful', () => {
    test('it should throw an error', async () => {
      try {
        // pass empty context object to force an error
        await createAPolicy({}, application.id);
      } catch (err) {
        assertError(err);
      }
    });
  });
});
