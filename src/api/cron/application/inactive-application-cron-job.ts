import dotenv from 'dotenv';
import updateInactiveApplications from '../../helpers/update-inactive-applications';
import { CronSchedulerJob } from '../../types';

dotenv.config();

const { INACTIVE_APPLICATION_SCHEDULE } = process.env;

const inactiveApplicationSchedule = INACTIVE_APPLICATION_SCHEDULE as string;

/**
 * updateInactiveApplicationsJob
 * CronSchedulerJob object which contains:
 * cronExpression: schedule on which the cron job runs - '* * * * * *'
 * description: description of cronjob
 * task: function which cron job runs - updateInactiveApplications
 */
export const updateInactiveApplicationsJob: CronSchedulerJob = {
  cronExpression: inactiveApplicationSchedule,
  description: 'Update inactive applications (over 30 days) to Abandoned',
  task: updateInactiveApplications,
};
