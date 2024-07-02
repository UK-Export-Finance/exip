import applicationSubmissionDeadineEmail from '.';
import sendEmail from '../../../emails';
import getKeystoneContext from '../../../test-helpers/get-keystone-context';
import { createFullApplication } from '../../../test-helpers';
import { dateInTheFutureByDays } from '../../date';
import mapApplicationSubmissionDeadlineVariables from '../../map-application-submission-deadline-variables';
import applications from '../../../test-helpers/applications';
import { Application, Context } from '../../../types';

describe('helpers/send-email-application-submission-deadline/send-email', () => {
  let context: Context;
  let application: Application;

  jest.mock('../../../emails');

  const sendEmailSubmissionDeadlineSpy = jest.fn();

  const today = new Date();
  const twoDaysInFuture = dateInTheFutureByDays(today, 2);

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  beforeEach(async () => {
    applications.deleteAll(context);
    application = await createFullApplication(context);

    await applications.update({ context, applicationId: application.id, data: { submissionDeadline: twoDaysInFuture } });
    application = await applications.get({ context, applicationId: application.id });

    jest.resetAllMocks();

    sendEmail.submissionDeadlineEmail = sendEmailSubmissionDeadlineSpy;
  });

  describe('when an account has an submissionDeadline 2 days in the future', () => {
    test('it should call sendEmail.submissionDeadlineEmail', async () => {
      await applicationSubmissionDeadineEmail.send([application]);

      const variables = mapApplicationSubmissionDeadlineVariables(application);

      expect(sendEmailSubmissionDeadlineSpy).toHaveBeenCalledTimes(1);
      expect(sendEmailSubmissionDeadlineSpy).toHaveBeenCalledWith(variables.email, variables);
    });

    test('it should return an array of length 1', async () => {
      const result = await applicationSubmissionDeadineEmail.send([application]);

      expect(result.length).toEqual(1);
    });
  });

  describe('error handling', () => {
    describe('sendEmail.submissionDeadlineEmail fails', () => {
      beforeEach(async () => {
        sendEmail.submissionDeadlineEmail = jest.fn(() => Promise.reject(new Error('Mock error')));
      });

      test('should return success as false', async () => {
        await expect(applicationSubmissionDeadineEmail.send([application])).rejects.toThrow('Sending application submission deadline email (send helper)');
      });
    });
  });
});
