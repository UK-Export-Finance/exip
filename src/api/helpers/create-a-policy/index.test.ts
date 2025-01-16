import createAPolicy from '.';
import { APPLICATION } from '../../constants';
import { Application, Context } from '../../types';
import { mockInvalidId } from '../../test-mocks';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import applications from '../../test-helpers/applications';

const assertError = (error) => {
  const errorString = String(error);

  expect(errorString.includes('Creating a policy')).toEqual(true);
};

describe('helpers/create-a-policy', () => {
  let context: Context;
  let application: Application;

  beforeAll(async () => {
    context = getKeystoneContext();

    application = (await applications.create({ context })) as Application;
  });

  it('should return a policy with ID and jointlyInsuredParty relationship', async () => {
    const result = await createAPolicy(context, application.id);

    expect(result.id).toBeDefined();
    expect(typeof result.id).toEqual('string');
    expect(result.id.length).toBeGreaterThan(0);
  });

  it('should return empty policy fields, default needPreCreditPeriodCover', async () => {
    const result = await createAPolicy(context, application.id);

    expect(result.applicationId).toEqual(application.id);
    expect(result.needPreCreditPeriodCover).toEqual(APPLICATION.DEFAULT_NEED_PRE_CREDIT_PERIOD_COVER);
    expect(result.policyType).toBeNull();
    expect(result.requestedStartDate).toBeNull();
    expect(result.contractCompletionDate).toBeNull();
    expect(result.totalValueOfContract).toBeNull();
    expect(result.creditPeriodWithBuyer).toEqual('');
    expect(result.policyCurrencyCode).toEqual('');
    expect(result.totalMonthsOfCover).toBeNull();
    expect(result.totalSalesToBuyer).toBeNull();
    expect(result.maximumBuyerWillOwe).toBeNull();
  });

  it('should return empty jointlyInsuredParty fields', async () => {
    const { jointlyInsuredParty } = await createAPolicy(context, application.id);

    expect(jointlyInsuredParty.requested).toBeNull();
    expect(jointlyInsuredParty.companyName).toEqual('');
    expect(jointlyInsuredParty.companyNumber).toEqual('');
    expect(jointlyInsuredParty.country).toBeUndefined();
  });

  describe('when an invalid application ID is passed', () => {
    it('should throw an error', async () => {
      try {
        await createAPolicy(context, mockInvalidId);
      } catch (error) {
        assertError(error);
      }
    });
  });

  describe('when creation is not successful', () => {
    it('should throw an error', async () => {
      try {
        // pass empty context object to force an error
        await createAPolicy({}, application.id);
      } catch (error) {
        assertError(error);
      }
    });
  });
});
