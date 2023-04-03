import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import baseConfig from '../keystone';
import submitApplication from './submit-application';
import generate from '../generate-csv';
import applicationSubmittedEmails from '../emails/send-application-submitted-emails';
import { APPLICATION } from '../constants';
import getPopulatedApplication from '../helpers/get-populated-application';
import { createFullApplication } from '../test-helpers';
import { mockSendEmailResponse } from '../test-mocks';
import { Application, SubmitApplicationVariables, SubmitApplicationResponse } from '../types';
import { Context } from '.keystone/types'; // eslint-disable-line

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

dotenv.config();

const context = getContext(config, PrismaModule) as Context;

describe('custom-resolvers/submit-application', () => {
  let submittedApplication: Application;
  let variables: SubmitApplicationVariables;
  let result: SubmitApplicationResponse;

  jest.mock('../generate-csv');
  jest.mock('../emails/send-application-submitted-emails');

  let generateCsvSpy = jest.fn();
  let applicationSubmittedEmailsSpy = jest.fn();

  const mockGenerateCsvResponse = '/mock-path-to-csv';

  beforeEach(async () => {
    jest.resetAllMocks();

    generateCsvSpy = jest.fn(() => mockGenerateCsvResponse);

    applicationSubmittedEmailsSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));

    generate.csv = generateCsvSpy;
    applicationSubmittedEmails.send = applicationSubmittedEmailsSpy;

    const application = await createFullApplication(context);

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

  test('it should call applicationSubmittedEmails.send', async () => {
    result = await submitApplication({}, variables, context);

    expect(applicationSubmittedEmailsSpy).toHaveBeenCalledTimes(1);

    const fullSubmittedApplication = await context.db.Application.findOne({
      where: { id: submittedApplication.id },
    });

    const populatedApplication = await getPopulatedApplication(context, fullSubmittedApplication);

    expect(applicationSubmittedEmailsSpy).toHaveBeenCalledWith(context, populatedApplication, mockGenerateCsvResponse);
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
