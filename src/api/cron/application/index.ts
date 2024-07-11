import { CronSchedulerJob } from '../../types';
import updateInactiveApplicationsJob from './inactive-application-cron-job';
import sendEmailApplicationSubmissionDeadlineReminderJob from './email-submission-deadline-reminder-cron-job';

/**
 * applicationCronSchedulerJobs
 * Array of CronSchedulerJobs: cron jobs to schedule and run
 */
const applicationCronSchedulerJobs: CronSchedulerJob[] = [updateInactiveApplicationsJob, sendEmailApplicationSubmissionDeadlineReminderJob];

export default applicationCronSchedulerJobs;
