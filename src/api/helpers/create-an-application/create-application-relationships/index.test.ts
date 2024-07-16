import applicationRelationships from '.';
import initialApplication from '../create-initial-application';
import getKeystoneContext from '../../../test-helpers/get-keystone-context';
import accounts from '../../../test-helpers/accounts';
import { Context, Account, Application } from '../../../types';

describe('helpers/create-an-application/create-initial-application', () => {
  let context: Context;
  let account: Account;
  let accountId = '';
  let application: Application;
  let result: object;

  beforeAll(async () => {
    context = getKeystoneContext();

    account = await accounts.create({ context });

    accountId = account.id;

    application = await initialApplication.create({ context, accountId });

    result = await applicationRelationships.create({
      context,
      applicationId: application.id,
      companyData: {},
      eligibilityAnswers: {},
      sectionReviewData: {},
    });
  });

  test('it should return relationship IDs', () => {
    expect(result.buyerId).toBeDefined();
    expect(typeof result.buyerId).toEqual('string');
    expect(result.companyId).toBeDefined();
    expect(typeof result.companyId).toEqual('string');
    expect(result.eligibilityId).toBeDefined();
    expect(typeof result.eligibilityId).toEqual('string');
    expect(result.exportContractId).toBeDefined();
    expect(typeof result.exportContractId).toEqual('string');
    expect(result.nominatedLossPayeeId).toBeDefined();
    expect(typeof result.nominatedLossPayeeId).toEqual('string');
    expect(result.policyId).toBeDefined();
    expect(typeof result.policyId).toEqual('string');
    expect(result.sectionReviewId).toBeDefined();
    expect(typeof result.sectionReviewId).toEqual('string');
  });

  describe('when creation is not successful', () => {
    test('it should throw an error', async () => {
      try {
        // pass empty context object to force an error
        result = await applicationRelationships.create({
          context: {},
          applicationId: application.id,
          companyData: {},
          eligibilityAnswers: {},
          sectionReviewData: {},
        });
      } catch (err) {
        const errorString = String(err);

        expect(errorString.includes(`Creating application relationships (createApplicationRelationships helper) for application ${application.id}`)).toEqual(
          true,
        );
      }
    });
  });
});
