import dotenv from 'dotenv';
import updateInactiveApplications from '../../helpers/update-inactive-applications';
import { CRON_DESCRIPTION_APPLICATION_UPDATE_INACTIVE } from '../../constants';
import { CronSchedulerJob } from '../../types';

dotenv.config();

const { CRON_SCHEDULE_INACTIVE_APPLICATION } = process.env;

/**
 * updateInactiveApplicationsJob
 * CronSchedulerJob object which contains:
 * cronExpression: schedule on which the cron job runs - '* * * * * *'
 * description: description of cronjob
 * task: function which cron job runs - updateInactiveApplications
 */
const updateInactiveApplicationsJob: CronSchedulerJob = {
  cronExpression: String(CRON_SCHEDULE_INACTIVE_APPLICATION),
  description: CRON_DESCRIPTION_APPLICATION_UPDATE_INACTIVE,
  task: updateInactiveApplications,
};

export default updateInactiveApplicationsJob;
