import dotenv from 'dotenv';
import applicationSubmissionDeadlineEmail from '../../helpers/send-email-application-submission-deadline';
import { CRON_DESCRIPTION_APPLICATION_SUBMISSION_DEADLINE_EMAIL } from '../../constants';
import { CronSchedulerJob } from '../../types';

dotenv.config();

const { CRON_SCHEDULE_SUBMISSION_DEADLINE_REMINDER_EMAIL } = process.env;

/**
 * sendEmailApplicationSubmissionDeadlineJob
 * CronSchedulerJob object which contains:
 * cronExpression: schedule on which the cron job runs - '* * * * * *'
 * description: description of cronjob
 * task: function which cron job runs - applicationSubmissionDeadlineEmail
 */
const sendEmailApplicationSubmissionDeadlineJob: CronSchedulerJob = {
  cronExpression: String(CRON_SCHEDULE_SUBMISSION_DEADLINE_REMINDER_EMAIL),
  description: CRON_DESCRIPTION_APPLICATION_SUBMISSION_DEADLINE_EMAIL,
  task: applicationSubmissionDeadlineEmail,
};

export default sendEmailApplicationSubmissionDeadlineJob;
