import dotenv from 'dotenv';
import applicationSubmissionDeadlineEmail from '../../helpers/send-email-application-submission-deadline';
import sendEmailApplicationSubmissionDeadlineJob from './email-submission-deadline-reminder-cron-job';
import { CRON_DESCRIPTION_APPLICATION_SUBMISSION_DEADLINE_EMAIL } from '../../constants';

dotenv.config();

const { CRON_SCHEDULE_SUBMISSION_DEADLINE_REMINDER_EMAIL } = process.env;

describe('cron/application/email-submission-deadline-cron-job', () => {
  it('should return an object with cronExpression, description and a task', () => {
    const expected = {
      cronExpression: String(CRON_SCHEDULE_SUBMISSION_DEADLINE_REMINDER_EMAIL),
      description: CRON_DESCRIPTION_APPLICATION_SUBMISSION_DEADLINE_EMAIL,
      task: applicationSubmissionDeadlineEmail,
    };

    expect(sendEmailApplicationSubmissionDeadlineJob).toEqual(expected);
  });
});
