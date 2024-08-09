import createAnApplicationHelper from '.';
import initialApplication from './create-initial-application';
import applicationRelationships from './create-application-relationships';
import applicationColumns from './update-application-columns';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import applications from '../../test-helpers/applications';
import { mockCountries, mockInvalidId } from '../../test-mocks';
import mockCompany from '../../test-mocks/mock-company';
import { APPLICATION } from '../../constants';
import { Context, Application } from '../../types';

const { STATUS, SUBMISSION_TYPE } = APPLICATION;

describe('helpers/create-an-application', () => {
  let context: Context;
  let application: Application;

  jest.mock('./create-initial-application');
  jest.mock('./create-application-relationships');
  jest.mock('./update-application-columns');

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
    status: STATUS.ABANDONED,
    submissionType: SUBMISSION_TYPE.MIA,
  };

  let initialApplicationCreateSpy;
  let applicationRelationshipsCreateSpy;
  let applicationColumnsUpdateSpy;

  let validSpys = {};

  const mockApplicationRelationshipsCreateResponse = {
    brokerId: '1',
    businessId: '2',
    buyerId: '3',
    companyId: '4',
    declarationId: '5',
    eligibilityId: '6',
    exportContractId: '7',
    nominatedLossPayeeId: '8',
    policyId: '9',
    policyContactId: '10',
    referenceNumber: '11',
    sectionReviewId: '12',
  };

  const mockApplicationColumnsUpdateResponse = {};

  beforeAll(async () => {
    context = getKeystoneContext();

    application = await applications.create({ context });

    variables.accountId = application.ownerId;

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
    await createAnApplicationHelper(variables, context);

    expect(initialApplicationCreateSpy).toHaveBeenCalledTimes(1);
    expect(initialApplicationCreateSpy).toHaveBeenCalledWith({
      context,
      accountId: variables.accountId,
      status: variables.status,
    });
  });

  it('should call applicationRelationships.create', async () => {
    await createAnApplicationHelper(variables, context);

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
    await createAnApplicationHelper(variables, context);

    expect(applicationColumnsUpdateSpy).toHaveBeenCalledTimes(1);

    const {
      brokerId,
      businessId,
      buyerId,
      companyId,
      declarationId,
      eligibilityId,
      exportContractId,
      nominatedLossPayeeId,
      policyId,
      policyContactId,
      referenceNumber,
      sectionReviewId,
    } = mockApplicationRelationshipsCreateResponse;

    expect(applicationColumnsUpdateSpy).toHaveBeenCalledWith({
      context,
      applicationId: application.id,
      brokerId,
      businessId,
      buyerId,
      companyId,
      declarationId,
      eligibilityId,
      exportContractId,
      nominatedLossPayeeId,
      policyId,
      policyContactId,
      referenceNumber,
      sectionReviewId,
    });
  });

  test('it should return the result of applicationColumns.update', async () => {
    const result = await createAnApplicationHelper(variables, context);

    const createdApplication = await applications.get({ context, applicationId: result.id });

    expect(result.id).toEqual(createdApplication.id);
  });

  describe('when there is no account for the provided accountId', () => {
    test('it should return null', async () => {
      variables.accountId = mockInvalidId;

      const result = await createAnApplicationHelper(variables, context);

      expect(result).toBeNull();
    });
  });
});
