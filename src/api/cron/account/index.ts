import { CronSchedulerJob } from '../../types';
import { updateUnverifiedAccountsJob } from './unverified-account-cron-job';

/**
 * accountCronSchedulerJobs
 * Array of CronSchedulerJobs: cron jobs to schedule and run
 */
export const accountCronSchedulerJobs: CronSchedulerJob[] = [updateUnverifiedAccountsJob];
