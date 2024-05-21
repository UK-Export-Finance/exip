import createAnApplication from '.';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import applications from '../../test-helpers/applications';
import accounts from '../../test-helpers/accounts';
import { mockAccount, mockCountries } from '../../test-mocks';
import mockCompany from '../../test-mocks/mock-company';
import { APPLICATION } from '../../constants';
import { Context, Account } from '../../types';

const { STATUS, SUBMISSION_TYPE } = APPLICATION;


describe('helpers/create-an-application', () => {
  let context: Context;
  let account: Account;

  const { status, ...mockAccountUpdate } = mockAccount;

  const variables = {
    accountId: '',
    eligibilityAnswers: {
      buyerCountryIsoCode: mockCountries[0].isoCode,
      hasCompaniesHouseNumber: true,
    },
    company: mockCompany,
    sectionReview: {
      eligibility: true,
    },
    status: STATUS.IN_PROGRESS,
    submissionType: SUBMISSION_TYPE.MIA,
  };

  beforeAll(async () => {
    context = getKeystoneContext();

    account = await accounts.create({ context, data: mockAccountUpdate });

    variables.accountId = account.id;
  });

  test('it should return an ID', async () => {
    const result = await createAnApplication({}, variables, context);

    const createdApplication = await applications.get({ context, applicationId: result.id });

    expect(result.id).toEqual(createdApplication.id);
  });

  test('it should return a reference number', async () => {
    const result = await createAnApplication({}, variables, context);

    const createdApplication = await applications.get({ context, applicationId: result.id });

    const expected = createdApplication.referenceNumber;

    expect(result.referenceNumber).toEqual(expected);
  });

  test('it should return application relationships', async () => {
    const result = await createAnApplication({}, variables, context);

    const application = await applications.get({ context, applicationId: result.id });

    const expected = {
      buyerId: application.buyer.id,
      companyId: application.company.id,
      eligibilityId: application.eligibility.id,
      exportContractId: application.exportContract.id,
      nominatedLossPayeeId: application.nominatedLossPayee.id,
      policyId: application.policy.id,
      sectionReviewId: application.sectionReview.id,
    };

    expect(result.buyerId).toEqual(expected.buyerId);
    expect(result.companyId).toEqual(expected.companyId);
    expect(result.eligibilityId).toEqual(expected.eligibilityId);
    expect(result.exportContractId).toEqual(expected.exportContractId);
    expect(result.nominatedLossPayeeId).toEqual(expected.nominatedLossPayeeId);
    expect(result.policyId).toEqual(expected.policyId);
    expect(result.sectionReviewId).toEqual(expected.sectionReviewId);
  });

  describe('when there is no account for the provided accountId', () => {
    test('it should return null', async () => {
      variables.accountId = 'invalid-id';

      const result = await createAnApplication({}, variables, context);

      expect(result).toBeNull();
    });
  });

  describe('when creation is not successful', () => {
    test('it should throw an error', async () => {
      try {
        // pass empty context object to force an error
        await createAnApplication({}, variables, {});
      } catch (err) {
        const errorString = String(err);

        expect(errorString.includes('Creating an application (createAnApplication helper)')).toEqual(true);
      }
    });
  });
});
