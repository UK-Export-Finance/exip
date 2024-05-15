import dotenv from 'dotenv';
import updateInactiveApplications from '../../helpers/update-inactive-applications';
import { UPDATE_INACTIVE_APPLICATION_DESCRIPTION } from '../../constants';
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
  description: UPDATE_INACTIVE_APPLICATION_DESCRIPTION,
  task: updateInactiveApplications,
};

export default updateInactiveApplicationsJob;
