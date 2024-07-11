import applicationSubmissionDeadlineEmail from '.';
import applicationSubmissionDeadineEmail from './send-email';
import sendEmail from '../../emails';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import { createFullApplication } from '../../test-helpers';
import { mockSendEmailResponse } from '../../test-mocks';
import { DATE_24_HOURS_FROM_NOW, APPLICATION } from '../../constants';
import { dateInTheFutureByDays } from '../date';
import applications from '../../test-helpers/applications';
import { Application, Context } from '../../types';

const { REMINDER_DAYS } = APPLICATION.SUBMISSION_DEADLINE_EMAIL;

describe('helpers/send-email-application-submission-deadline', () => {
  let context: Context;
  let application: Application;

  jest.mock('../../emails');
  jest.mock('./send-email');

  let sendEmailSubmissionDeadlineSpy = jest.fn();
  let sendEmailSpy = jest.fn();

  const today = new Date();
  const reminderDays = dateInTheFutureByDays(today, REMINDER_DAYS);

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  beforeEach(async () => {
    applications.deleteAll(context);
    application = await createFullApplication(context);

    await applications.update({ context, applicationId: application.id, data: { submissionDeadline: reminderDays } });
    application = await applications.get({ context, applicationId: application.id });

    jest.resetAllMocks();

    sendEmailSubmissionDeadlineSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));
    sendEmailSpy = jest.fn(() => Promise.resolve([application]));

    sendEmail.submissionDeadlineEmail = sendEmailSubmissionDeadlineSpy;
    applicationSubmissionDeadineEmail.send = sendEmailSpy;
  });

  describe(`when an account has an submissionDeadline ${REMINDER_DAYS} days in the future`, () => {
    test('it should call sendEmail.submissionDeadlineEmail and return success=true', async () => {
      const result = await applicationSubmissionDeadlineEmail(context);

      expect(sendEmailSpy).toHaveBeenCalledTimes(1);
      expect(sendEmailSpy).toHaveBeenCalledWith([application]);

      const expected = {
        success: true,
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when an account has an submissionDeadline ${REMINDER_DAYS} days in the future but sendEmail.submissionDeadlineEmail returns an array of length 0`, () => {
    test('it should call sendEmail.submissionDeadlineEmail and return success=false when sendEmail.submissionDeadlineEmail returns an array of 0 length', async () => {
      applicationSubmissionDeadineEmail.send = jest.fn(() => Promise.resolve([]));

      const result = await applicationSubmissionDeadlineEmail(context);

      const expected = {
        success: false,
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when no accounts have a submissionDeadline ${REMINDER_DAYS} days in the future`, () => {
    test('it should NOT call sendEmail.submissionDeadlineEmail and return success=true', async () => {
      await applications.update({ context, applicationId: application.id, data: { submissionDeadline: DATE_24_HOURS_FROM_NOW() } });

      const result = await applicationSubmissionDeadlineEmail(context);

      expect(sendEmailSubmissionDeadlineSpy).toHaveBeenCalledTimes(0);

      const expected = {
        success: true,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('error handling', () => {
    describe('when an error occurs whilst getting and sending email for expiring applications', () => {
      test('should return success as false', async () => {
        jest.resetAllMocks();
        await expect(applicationSubmissionDeadlineEmail()).rejects.toThrow(
          'Sending application submission deadline email (emailApplicationSubmissionDeadlineEmail helper)',
        );
      });
    });
  });
});
