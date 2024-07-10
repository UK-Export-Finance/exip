import submitApplication from '.';
import generate from '../../../generate-xlsx';
import applicationSubmittedEmails from '../../../emails/send-application-submitted-emails';
import { APPLICATION, DATE_ONE_MINUTE_IN_THE_PAST } from '../../../constants';
import getPopulatedApplication from '../../../helpers/get-populated-application';
import getCountries from '../../../helpers/get-countries';
import { createFullApplication } from '../../../test-helpers';
import { mockSendEmailResponse } from '../../../test-mocks';
import { Application, Context, SubmitApplicationVariables, SuccessResponse } from '../../../types';
import getKeystoneContext from '../../../test-helpers/get-keystone-context';
import applications from '../../../test-helpers/applications';

describe('custom-resolvers/submit-application', () => {
  let context: Context;
  let submittedApplication: Application;
  let variables: SubmitApplicationVariables;
  let result: SuccessResponse;
  let application: Application;

  jest.mock('../../../generate-xlsx');
  jest.mock('../../../emails/send-application-submitted-emails');

  let generateXLSXSpy = jest.fn();
  let applicationSubmittedEmailsSpy = jest.fn();

  const mockGenerateXLSXResponse = '/mock-path-to-xlsx';
  const now = new Date();

  beforeAll(() => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    jest.resetAllMocks();

    applicationSubmittedEmailsSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));

    applicationSubmittedEmails.send = applicationSubmittedEmailsSpy;

    generateXLSXSpy = jest.fn(() => Promise.resolve(mockGenerateXLSXResponse));

    generate.XLSX = generateXLSXSpy;

    application = await createFullApplication(context);

    variables = {
      applicationId: application.id,
    };

    result = await submitApplication({}, variables, context);

    // get the submitted application
    submittedApplication = (await context.query.Application.findOne({
      where: {
        id: application.id,
      },
      query: 'id status previousStatus submissionDate submissionCount',
    })) as Application;
  });

  it('should return success=true', () => {
    expect(result.success).toEqual(true);
  });

  it(`should change the application status to ${APPLICATION.STATUS.SUBMITTED}`, () => {
    expect(submittedApplication.status).toEqual(APPLICATION.STATUS.SUBMITTED);
  });

  it(`should add a previous status of ${APPLICATION.STATUS.IN_PROGRESS}`, () => {
    expect(submittedApplication.previousStatus).toEqual(APPLICATION.STATUS.IN_PROGRESS);
  });

  it('should add a submissionDate', () => {
    const { submissionDate } = submittedApplication;

    const submissionDateDay = new Date(submissionDate).getDay();

    const expectedDay = now.getDay();

    expect(submissionDateDay).toEqual(expectedDay);
  });

  it('should update the submissionCount', () => {
    const initialCount = application.submissionCount;

    const expectedCount = initialCount + 1;

    expect(submittedApplication.submissionCount).toEqual(expectedCount);
  });

  describe('XLSX generation and emails', () => {
    let populatedApplication: Application;
    let fullSubmittedApplication;

    beforeEach(async () => {
      fullSubmittedApplication = await context.db.Application.findOne({
        where: { id: submittedApplication.id },
      });

      populatedApplication = await getPopulatedApplication.get({
        context,
        application: fullSubmittedApplication,
        decryptFinancialUk: true,
        decryptFinancialInternational: true,
      });
    });

    test('it should call generate.XLSX', async () => {
      expect(generateXLSXSpy).toHaveBeenCalledTimes(1);

      const expectedCountries = await getCountries(context);

      expect(generateXLSXSpy).toHaveBeenCalledWith(populatedApplication, expectedCountries);
    });

    test('it should call applicationSubmittedEmails.send', async () => {
      expect(applicationSubmittedEmailsSpy).toHaveBeenCalledTimes(1);

      expect(applicationSubmittedEmailsSpy).toHaveBeenCalledWith(populatedApplication, mockGenerateXLSXResponse);
    });
  });

  describe('when an application is not found', () => {
    it('should return success=false', async () => {
      // create a new application so we can get a valid ID format
      const applicationData = {};

      const newApplication = (await applications.create({ context, data: applicationData })) as Application;

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

  describe("when the date is NOT before the application's submission deadline", () => {
    it('should return success=false', async () => {
      /**
       * create a new application,
       * so we can set submission deadline in the past.
       */

      const oneMinuteInThePast = DATE_ONE_MINUTE_IN_THE_PAST();

      const newApplication = (await context.query.Application.createOne({
        query: 'id',
        data: {},
      })) as Application;

      // update the submission deadline
      await context.query.Application.updateOne({
        where: { id: newApplication.id },
        data: {
          submissionDeadline: oneMinuteInThePast,
        },
      });

      variables = {
        applicationId: newApplication.id,
      };

      result = await submitApplication({}, variables, context);

      expect(result.success).toEqual(false);
    });
  });

  describe('when an application has a count that is NOT 0', () => {
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
