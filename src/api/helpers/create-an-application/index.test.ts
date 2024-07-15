import createAnApplication from '.';
import initialApplication from './create-initial-application';
import applicationRelationships from './create-application-relationships';
import applicationColumns from './update-application-columns';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import accounts from '../../test-helpers/accounts';
import applications from '../../test-helpers/applications';
import { mockAccount, mockCountries } from '../../test-mocks';
import mockCompany from '../../test-mocks/mock-company';
import { APPLICATION } from '../../constants';
import { Context, Account, Application } from '../../types';

const { STATUS, SUBMISSION_TYPE } = APPLICATION;

describe('helpers/create-an-application', () => {
  let context: Context;
  let account: Account;
  let application: Application;

  const mockError = 'Mock error';

  jest.mock('./create-initial-application');
  jest.mock('./create-application-relationships');
  jest.mock('./update-application-columns');

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

  let initialApplicationCreateSpy;
  let applicationRelationshipsCreateSpy;
  let applicationColumnsUpdateSpy;

  let validSpys = {};

  const mockApplicationRelationshipsCreateResponse = {
    buyerId: '1',
    companyId: '2',
    eligibilityId: '3',
    exportContractId: '4',
    nominatedLossPayeeId: '5',
    policyId: '6',
    sectionReviewId: '7',
  };

  const mockApplicationColumnsUpdateResponse = {};

  beforeAll(async () => {
    context = getKeystoneContext();

    account = await accounts.create({ context, data: mockAccountUpdate });
    application = await applications.create({ context });

    variables.accountId = account.id;

    mockApplicationColumnsUpdateResponse.id = application.id;

    validSpys = {
      initialApplicationCreate: jest.fn(() => Promise.resolve(application)),
      applicationRelationshipsCreate: jest.fn().mockResolvedValue(mockApplicationRelationshipsCreateResponse),
      applicationColumnsUpdate: jest.fn(() => Promise.resolve(mockApplicationColumnsUpdateResponse)),
    };

    initialApplicationCreateSpy = validSpys.initialApplicationCreate;
    applicationRelationshipsCreateSpy = validSpys.applicationRelationshipsCreate;
    applicationColumnsUpdateSpy = validSpys.applicationColumnsUpdate;

    initialApplication.create = initialApplicationCreateSpy;
    applicationRelationships.create = applicationRelationshipsCreateSpy;
    applicationColumns.update = applicationColumnsUpdateSpy;
  });

  it('should call initialApplication.create', async () => {
    await createAnApplication({}, variables, context);

    expect(initialApplicationCreateSpy).toHaveBeenCalledTimes(1);
    expect(initialApplicationCreateSpy).toHaveBeenCalledWith({
      context,
      accountId: variables.accountId,
      status: variables.status,
    });
  });

  it('should call applicationRelationships.create', async () => {
    await createAnApplication({}, variables, context);

    expect(applicationRelationshipsCreateSpy).toHaveBeenCalledTimes(1);
    expect(applicationRelationshipsCreateSpy).toHaveBeenCalledWith({
      context,
      applicationId: application.id,
      companyData: variables.company,
      eligibilityAnswers: variables.eligibilityAnswers,
      sectionReviewData: variables.sectionReview,
    });
  });

  it('should call applicationColumns.update', async () => {
    await createAnApplication({}, variables, context);

    expect(applicationColumnsUpdateSpy).toHaveBeenCalledTimes(1);

    const { buyerId, companyId, eligibilityId, exportContractId, nominatedLossPayeeId, policyId, sectionReviewId } = mockApplicationRelationshipsCreateResponse;

    expect(applicationColumnsUpdateSpy).toHaveBeenCalledWith({
      context,
      applicationId: application.id,
      buyerId,
      companyId,
      eligibilityId,
      exportContractId,
      nominatedLossPayeeId,
      policyId,
      sectionReviewId,
    });
  });

  test('it should return the result of applicationColumns.update', async () => {
    const result = await createAnApplication({}, variables, context);

    const createdApplication = await applications.get({ context, applicationId: result.id });

    expect(result.id).toEqual(createdApplication.id);
  });

  // test('it should return a reference number', async () => {
  //   const result = await createAnApplication({}, variables, context);

  //   const createdApplication = await applications.get({ context, applicationId: result.id });

  //   const expected = createdApplication.referenceNumber;

  //   expect(result.referenceNumber).toEqual(expected);
  // });

  // test('it should return application relationships', async () => {
  //   const result = await createAnApplication({}, variables, context);

  //   const application = await applications.get({ context, applicationId: result.id });

  //   const expected = {
  //     buyerId: application.buyer.id,
  //     companyId: application.company.id,
  //     eligibilityId: application.eligibility.id,
  //     exportContractId: application.exportContract.id,
  //     nominatedLossPayeeId: application.nominatedLossPayee.id,
  //     policyId: application.policy.id,
  //     sectionReviewId: application.sectionReview.id,
  //   };

  //   expect(result.buyerId).toEqual(expected.buyerId);
  //   expect(result.companyId).toEqual(expected.companyId);
  //   expect(result.eligibilityId).toEqual(expected.eligibilityId);
  //   expect(result.exportContractId).toEqual(expected.exportContractId);
  //   expect(result.nominatedLossPayeeId).toEqual(expected.nominatedLossPayeeId);
  //   expect(result.policyId).toEqual(expected.policyId);
  //   expect(result.sectionReviewId).toEqual(expected.sectionReviewId);
  // });

  describe('when there is no account for the provided accountId', () => {
    test('it should return null', async () => {
      variables.accountId = 'invalid-id';

      const result = await createAnApplication({}, variables, context);

      expect(result).toBeNull();
    });
  });

  describe('error handling', () => {
    describe('when initialApplication.create fails', () => {
      beforeEach(() => {
        initialApplicationCreateSpy = jest.fn(() => Promise.reject(new Error(mockError)));

        initialApplication.create = initialApplicationCreateSpy;
      });

      it('should throw an error', async () => {
        const expectedMessage = `Creating an application (createAnApplication helper) for user ${account.id} Error: ${mockError}`;

        await expect(createAnApplication({}, variables, context)).rejects.toThrow(expectedMessage);
      });
    });
  });

  describe('when applicationRelationships.create fails', () => {
    beforeEach(() => {
      initialApplicationCreateSpy = validSpys.initialApplicationCreate;

      applicationRelationshipsCreateSpy = jest.fn(() => Promise.reject(new Error(mockError)));

      applicationRelationships.create = initialApplicationCreateSpy;
    });

    it('should throw an error', async () => {
      const expectedMessage = `Creating an application (createAnApplication helper) for user ${account.id} Error: ${mockError}`;

      await expect(createAnApplication({}, variables, context)).rejects.toThrow(expectedMessage);
    });
  });

  describe('when applicationColumns.update fails', () => {
    beforeEach(() => {
      applicationRelationshipsCreateSpy = jest.fn(() => Promise.reject(new Error(mockError)));

      applicationColumns.update = applicationColumnsUpdateSpy;
    });

    it('should throw an error', async () => {
      const expectedMessage = `Creating an application (createAnApplication helper) for user ${account.id} Error: ${mockError}`;

      await expect(createAnApplication({}, variables, context)).rejects.toThrow(expectedMessage);
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
