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

  test('it should return a policy with ID and jointlyInsuredParty relationship', async () => {
    const { policy } = await createAPolicy(context, application.id);

    expect(policy.id).toBeDefined();
    expect(typeof policy.id).toEqual('string');
    expect(policy.id.length).toBeGreaterThan(0);
  });

  test('it should return empty policy fields, default needPreCreditPeriodCover', async () => {
    const { policy } = await createAPolicy(context, application.id);

    expect(policy.applicationId).toEqual(application.id);
    expect(policy.needPreCreditPeriodCover).toEqual(APPLICATION.DEFAULT_NEED_PRE_CREDIT_PERIOD_COVER);
    expect(policy.policyType).toEqual(null);
    expect(policy.requestedStartDate).toEqual(null);
    expect(policy.contractCompletionDate).toEqual(null);
    expect(policy.totalValueOfContract).toEqual(null);
    expect(policy.creditPeriodWithBuyer).toEqual('');
    expect(policy.policyCurrencyCode).toEqual('');
    expect(policy.totalMonthsOfCover).toEqual(null);
    expect(policy.totalSalesToBuyer).toEqual(null);
    expect(policy.maximumBuyerWillOwe).toEqual(null);
  });

  test('it should return empty jointlyInsuredParty fields', async () => {
    const { jointlyInsuredParty } = await createAPolicy(context, application.id);

    expect(jointlyInsuredParty.requested).toEqual(null);
    expect(jointlyInsuredParty.companyName).toEqual('');
    expect(jointlyInsuredParty.companyNumber).toEqual('');
    expect(jointlyInsuredParty.country).toBeUndefined();
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
