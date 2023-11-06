import createAnApplication from '.';
import { mockAccount, mockCountries } from '../../../test-mocks';
import mockCompany from '../../../test-mocks/mock-company';
import { Account, Context, SuccessResponse } from '../../../types';
import getKeystoneContext from '../../../test-helpers/get-keystone-context';
import accounts from '../../../test-helpers/accounts';
import applications from '../../../test-helpers/applications';

describe('custom-resolvers/create-an-application', () => {
  let context: Context;
  let account: Account;
  let result: SuccessResponse;

  const variables = {
    accountId: '',
    eligibilityAnswers: {
      buyerCountryIsoCode: mockCountries[0].isoCode,
      hasCompaniesHouseNumber: true,
      needPreCreditPeriodCover: false,
    },
    company: mockCompany,
  };

  beforeAll(async () => {
    context = getKeystoneContext();

    account = await accounts.create({ context, data: mockAccount });

    variables.accountId = account.id;
  });

  test('it should return success=true', async () => {
    result = await createAnApplication({}, variables, context);

    expect(result.success).toEqual(true);
  });

  test('it should return an ID', async () => {
    result = await createAnApplication({}, variables, context);

    const createdApplication = await applications.get({ context, applicationId: result.id });

    expect(result.id).toEqual(createdApplication.id);
  });

  test('it should return a reference number', async () => {
    result = await createAnApplication({}, variables, context);

    const createdApplication = await applications.get({ context, applicationId: result.id });

    const expected = createdApplication.referenceNumber;

    expect(result.referenceNumber).toEqual(expected);
  });

  test('it should create buyer, eligibility, policy and company relationships', async () => {
    result = await createAnApplication({}, variables, context);

    const application = await applications.get({ context, applicationId: result.id });

    const expected = {
      buyerId: application.buyer.id,
      eligibilityId: application.eligibility.id,
      policyId: application.policy.id,
      companyId: application.company.id,
    };

    expect(result.buyerId).toEqual(expected.buyerId);
    expect(result.eligibilityId).toEqual(expected.eligibilityId);
    expect(result.policyId).toEqual(expected.policyId);

    expect(result.companyId).toEqual(expected.companyId);
  });

  describe('when there is no account for the provided accountId', () => {
    test('it should return success=false', async () => {
      variables.accountId = 'invalid-id';

      result = await createAnApplication({}, variables, context);

      expect(result.success).toEqual(false);
    });
  });

  describe('when creation is not successful', () => {
    test('it should throw an error', async () => {
      try {
        // pass empty context object to force an error
        await createAnApplication({}, variables, {});
      } catch (err) {
        const errorString = String(err);

        expect(errorString.includes('Creating application')).toEqual(true);
      }
    });
  });
});
