import createAnApplicationHelper from '.';
import initialApplication from './create-initial-application';
import applicationRelationships from './create-application-relationships';
import applicationColumns from './update-application-columns';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import applications from '../../test-helpers/applications';
import { mockCountries } from '../../test-mocks';
import mockCompany from '../../test-mocks/mock-company';
import { APPLICATION } from '../../constants';
import { Context, Application } from '../../types';

const { STATUS, SUBMISSION_TYPE } = APPLICATION;

describe('helpers/create-an-application - error handling', () => {
  let context: Context;
  let application: Application;

  const mockError = 'Mock error';

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

  beforeAll(() => {
    context = getKeystoneContext();
  });

  beforeAll(async () => {
    application = await applications.create({ context });

    variables.accountId = application.ownerId;

    mockApplicationColumnsUpdateResponse.id = application.id;

    validSpys = {
      initialApplicationCreate: jest.fn().mockResolvedValue(application),
      applicationRelationshipsCreate: jest.fn().mockResolvedValue(mockApplicationRelationshipsCreateResponse),
      applicationColumnsUpdate: jest.fn().mockResolvedValue(mockApplicationColumnsUpdateResponse),
    };

    initialApplication.create = validSpys.initialApplicationCreate;
    applicationRelationships.create = validSpys.applicationRelationshipsCreate;
    applicationColumns.update = validSpys.applicationColumnsUpdate;
  });

  describe('when initialApplication.create fails', () => {
    beforeEach(() => {
      initialApplication.create = jest.fn(() => Promise.reject(new Error(mockError)));
    });

    it('should throw an error', async () => {
      const expectedMessage = `Creating an application (createAnApplication helper) for user ${application.ownerId} Error: ${mockError}`;

      await expect(createAnApplicationHelper(variables, context)).rejects.toThrow(expectedMessage);
    });
  });

  describe('when applicationRelationships.create fails', () => {
    beforeEach(() => {
      applicationRelationships.create = jest.fn(() => Promise.reject(new Error(mockError)));
    });

    it('should throw an error', async () => {
      const expectedMessage = `Creating an application (createAnApplication helper) for user ${application.ownerId} Error: ${mockError}`;

      await expect(createAnApplicationHelper(variables, context)).rejects.toThrow(expectedMessage);
    });
  });

  describe('when applicationColumns.update fails', () => {
    beforeEach(() => {
      applicationColumns.update = jest.fn(() => Promise.reject(new Error(mockError)));
    });

    it('should throw an error', async () => {
      const expectedMessage = `Creating an application (createAnApplication helper) for user ${application.ownerId} Error: ${mockError}`;

      await expect(createAnApplicationHelper(variables, context)).rejects.toThrow(expectedMessage);
    });
  });

  describe('when creation is not successful', () => {
    test('it should throw an error', async () => {
      try {
        // pass empty context object to force an error
        await createAnApplicationHelper({}, variables, {});
      } catch (err) {
        const errorString = String(err);

        expect(errorString.includes('Creating an application (createAnApplication helper)')).toEqual(true);
      }
    });
  });
});
