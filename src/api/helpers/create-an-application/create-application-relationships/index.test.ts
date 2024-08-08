import applicationRelationships from '.';
import initialApplication from '../create-initial-application';
import getKeystoneContext from '../../../test-helpers/get-keystone-context';
import accounts from '../../../test-helpers/accounts';
import { mockApplicationEligibility } from '../../../test-mocks/mock-application';
import { Context, Account, Application } from '../../../types';

describe('helpers/create-an-application/create-application-relationships', () => {
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

  test('it should return relationship IDs and a reference number', () => {
    expect(typeof result.brokerId).toEqual('string');
    expect(typeof result.businessId).toEqual('string');
    expect(typeof result.buyerId).toEqual('string');
    expect(typeof result.companyId).toEqual('string');
    expect(typeof result.declarationId).toEqual('string');
    expect(typeof result.eligibilityId).toEqual('string');
    expect(typeof result.exportContractId).toEqual('string');
    expect(typeof result.nominatedLossPayeeId).toEqual('string');
    expect(typeof result.policyId).toEqual('string');
    expect(typeof result.policyContactId).toEqual('string');
    expect(typeof result.referenceNumber).toEqual('number');
    expect(typeof result.sectionReviewId).toEqual('string');
  });

  describe('when a buyer country is not found', () => {
    test('it should throw an error', async () => {
      try {
        // pass empty context object to force an error
        result = await applicationRelationships.create({
          context,
          applicationId: application.id,
          companyData: {},
          eligibilityAnswers: {
            ...mockApplicationEligibility,
            buyerCountryIsoCode: 'INVALID',
          },
          sectionReviewData: {},
        });
      } catch (err) {
        const errorString = String(err);

        expect(
          errorString.includes(
            `Unable to create application relationships - buyer country not found (createApplicationRelationships helper) for application ${application.id}`,
          ),
        ).toEqual(true);
      }
    });
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
