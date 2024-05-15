import { CronSchedulerJob } from '../../types';
import updateInactiveApplicationsJob from './inactive-application-cron-job';

/**
 * applicationCronSchedulerJobs
 * Array of CronSchedulerJobs: cron jobs to schedule and run
 */
const applicationCronSchedulerJobs: CronSchedulerJob[] = [updateInactiveApplicationsJob];

export default applicationCronSchedulerJobs;
