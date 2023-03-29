import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import baseConfig from '../keystone';
import submitApplication from './submit-application';
import { APPLICATION } from '../constants';
import sendEmail from '../emails';
import { mockAccount, mockBuyer, mockApplicationDeclaration, mockSendEmailResponse } from '../test-mocks';
import {
  Account,
  Application,
  ApplicationBuyer,
  ApplicationDeclaration,
  SubmitApplicationVariables,
  SubmitApplicationResponse,
  ApplicationSubmissionEmailVariables,
} from '../types';
import { Context } from '.keystone/types'; // eslint-disable-line

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

dotenv.config();

const context = getContext(config, PrismaModule) as Context;

const updateBuyer = async (buyerId: string): Promise<ApplicationBuyer> => {
  // update the buyer so there is a name
  const buyer = (await context.query.Buyer.updateOne({
    where: {
      id: buyerId,
    },
    data: mockBuyer,
    query: 'id companyOrOrganisationName',
  })) as ApplicationBuyer;

  return buyer;
};

const createRequiredData = async () => {
  // create a new exporter
  const exporter = (await context.query.Exporter.createOne({
    data: mockAccount,
    query: 'id firstName email',
  })) as Account;

  // create a new application
  const application = (await context.query.Application.createOne({
    query: 'id referenceNumber exporter { id } buyer { id } declaration { id }',
    data: {
      exporter: {
        connect: {
          id: exporter.id,
        },
      },
    },
  })) as Application;

  // update the buyer so there is a name
  const buyer = await updateBuyer(application.buyer.id);

  // update the declaration so we have full data set.
  const declaration = (await context.query.Declaration.updateOne({
    where: {
      id: application.declaration.id,
    },
    data: mockApplicationDeclaration,
    query: 'id',
  })) as ApplicationDeclaration;

  return {
    exporter,
    application,
    buyer,
    declaration,
  };
};

describe('custom-resolvers/submit-application', () => {
  let exporter: Account;
  let buyer: ApplicationBuyer;
  let application: Application;
  let submittedApplication: Application;
  let variables: SubmitApplicationVariables;
  let result: SubmitApplicationResponse;

  jest.mock('../emails');

  let sendApplicationSubmittedEmailSpy = jest.fn();
  let sendDocumentsEmailSpy = jest.fn();

  beforeEach(async () => {
    jest.resetAllMocks();

    sendApplicationSubmittedEmailSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));
    sendDocumentsEmailSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));

    sendEmail.applicationSubmittedEmail = sendApplicationSubmittedEmailSpy;
    sendEmail.documentsEmail = sendDocumentsEmailSpy;

    const data = await createRequiredData();

    exporter = data.exporter;
    buyer = data.buyer;
    application = data.application;

    variables = {
      applicationId: application.id,
    };

    result = await submitApplication({}, variables, context);

    // get the submitted application
    submittedApplication = (await context.query.Application.findOne({
      where: {
        id: application.id,
      },
      query: 'id status previousStatus submissionDate',
    })) as Application;
  });

  it('should return success=true', () => {
    expect(result.success).toEqual(true);
  });

  it(`should change the application status to ${APPLICATION.STATUS.SUBMITTED}`, () => {
    expect(submittedApplication.status).toEqual(APPLICATION.STATUS.SUBMITTED);
  });

  it(`should add a previous status of ${APPLICATION.STATUS.DRAFT}`, () => {
    expect(submittedApplication.previousStatus).toEqual(APPLICATION.STATUS.DRAFT);
  });

  it('should add a submissionDate', () => {
    const { submissionDate } = submittedApplication;

    const submissionDateDay = new Date(submissionDate).getDay();

    const now = new Date();

    const expectedDay = now.getDay();

    expect(submissionDateDay).toEqual(expectedDay);
  });

  describe('emails', () => {
    let expectedSendEmailVars: ApplicationSubmissionEmailVariables;

    beforeEach(() => {
      const { email, firstName } = exporter;
      const { referenceNumber } = application;
      const { companyOrOrganisationName } = buyer;

      expectedSendEmailVars = {
        emailAddress: email,
        firstName,
        referenceNumber,
        buyerName: companyOrOrganisationName,
      } as ApplicationSubmissionEmailVariables;
    });

    test('it should call sendEmail.applicationSubmittedEmail', async () => {
      result = await submitApplication({}, variables, context);

      expect(sendApplicationSubmittedEmailSpy).toHaveBeenCalledTimes(1);
      expect(sendApplicationSubmittedEmailSpy).toHaveBeenCalledWith(expectedSendEmailVars);
    });

    test('it should call sendEmail.documentsEmail', async () => {
      result = await submitApplication({}, variables, context);

      expect(sendDocumentsEmailSpy).toHaveBeenCalledTimes(1);

      const useAntiBriberyAndTradingHistoryTemplate = true;

      expect(sendDocumentsEmailSpy).toHaveBeenCalledWith(expectedSendEmailVars, useAntiBriberyAndTradingHistoryTemplate);
    });

    describe('when the declaration has an answer of `No` for hasAntiBriberyCodeOfConduct', () => {
      let newApplication: Application;

      beforeEach(async () => {
        jest.resetAllMocks();

        sendApplicationSubmittedEmailSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));
        sendDocumentsEmailSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));

        sendEmail.applicationSubmittedEmail = sendApplicationSubmittedEmailSpy;
        sendEmail.documentsEmail = sendDocumentsEmailSpy;

        // create a new application
        newApplication = (await context.query.Application.createOne({
          query: 'id referenceNumber exporter { id } buyer { id } declaration { id }',
          data: {
            exporter: {
              connect: {
                id: exporter.id,
              },
            },
          },
        })) as Application;

        // update the buyer so there is a name
        await updateBuyer(newApplication.buyer.id);

        // update the declaration so there is an answer of "no"
        (await context.query.Declaration.updateOne({
          where: {
            id: newApplication.declaration.id,
          },
          data: {
            hasAntiBriberyCodeOfConduct: 'No',
          },
          query: 'id hasAntiBriberyCodeOfConduct',
        })) as ApplicationDeclaration;

        variables.applicationId = newApplication.id;
      });

      test('it should call sendEmail.documentsEmail without a template flag', async () => {
        result = await submitApplication({}, variables, context);

        expect(sendDocumentsEmailSpy).toHaveBeenCalledTimes(1);

        expectedSendEmailVars.referenceNumber = newApplication.referenceNumber;
        expect(sendDocumentsEmailSpy).toHaveBeenCalledWith(expectedSendEmailVars);
      });
    });
  });

  describe('when an application is not found', () => {
    it('should return success=false', async () => {
      // create a new application so we can get a valid ID format
      const newApplication = (await context.query.Application.createOne({
        query: 'id',
        data: {},
      })) as Application;

      variables = {
        applicationId: newApplication.id,
      };

      // delete the application so it will not be found
      (await context.query.Application.deleteOne({
        where: {
          id: newApplication.id,
        },
      })) as Application;

      result = await submitApplication({}, variables, context);

      expect(result.success).toEqual(false);
    });
  });

  describe('when an application is already submitted', () => {
    it('should return success=false', async () => {
      variables = {
        applicationId: submittedApplication.id,
      };

      result = await submitApplication({}, variables, context);

      expect(result.success).toEqual(false);
    });
  });

  describe('error handling', () => {
    test('should throw an error', async () => {
      variables = {
        applicationId: 'invalidId',
      };

      try {
        await submitApplication({}, variables, context);
      } catch (err) {
        const expected = new Error(`Submitting application Input error: Only a cuid can be passed to id filters`);

        expect(err).toEqual(expected);
      }
    });
  });
});
