import applicationColumns from '.';
import initialApplication from '../create-initial-application';
import applicationRelationships from '../create-application-relationships';
import getKeystoneContext from '../../../test-helpers/get-keystone-context';
import accounts from '../../../test-helpers/accounts';
import { Context, Account, Application } from '../../../types';

describe('helpers/create-an-application/update-application-columns', () => {
  let context: Context;
  let account: Account;
  let accountId = '';
  let application: Application;
  let result: Application;
  let createdRelationships: object;

  beforeAll(async () => {
    context = getKeystoneContext();

    account = await accounts.create({ context });

    accountId = account.id;

    application = await initialApplication.create({ context, accountId });

    createdRelationships = await applicationRelationships.create({
      context,
      applicationId: application.id,
      companyData: {},
      eligibilityAnswers: {},
      sectionReviewData: {},
    });

    result = await applicationColumns.update({
      context,
      applicationId: application.id,
      buyerId: createdRelationships.buyerId,
      companyId: createdRelationships.companyId,
      declarationId: createdRelationships.declarationId,
      eligibilityId: createdRelationships.eligibilityId,
      exportContractId: createdRelationships.exportContractId,
      nominatedLossPayeeId: createdRelationships.nominatedLossPayeeId,
      policyId: createdRelationships.policyId,
      sectionReviewId: createdRelationships.sectionReviewId,
    });
  });

  test('it should return an application', () => {
    expect(result.buyerId).toEqual(createdRelationships.buyerId);
    expect(result.companyId).toEqual(createdRelationships.companyId);
    expect(result.declarationId).toEqual(createdRelationships.declarationId);
    expect(result.eligibilityId).toEqual(createdRelationships.eligibilityId);
    expect(result.exportContractId).toEqual(createdRelationships.exportContractId);
    expect(result.nominatedLossPayeeId).toEqual(createdRelationships.nominatedLossPayeeId);
    expect(result.policyId).toEqual(createdRelationships.policyId);
    expect(result.sectionReviewId).toEqual(createdRelationships.sectionReviewId);
  });

  describe('when creation is not successful', () => {
    test('it should throw an error', async () => {
      try {
        // pass empty context object to force an error
        await applicationColumns.update({
          context: {},
          applicationId: application.id,
          buyerId: createdRelationships.buyerId,
          companyId: createdRelationships.companyId,
          eligibilityId: createdRelationships.eligibilityId,
          exportContractId: createdRelationships.exportContractId,
          nominatedLossPayeeId: createdRelationships.nominatedLossPayeeId,
          policyId: createdRelationships.policyId,
          sectionReviewId: createdRelationships.sectionReviewId,
        });
      } catch (error) {
        const errorString = String(error);

        expect(errorString.includes(`Updating application relationship columns (updateApplicationColumns helper) for application ${application.id}`)).toEqual(
          true,
        );
      }
    });
  });
});
