import cronJobScheduler from './cron-job-scheduler';
import accountCronSchedulerJobs from './account';
import applicationCronSchedulerJobs from './application';
import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * cronJobs
 * Runs cron jobs
 * @param {Context} KeystoneJS context API
 */
const cronJobs = (context: Context) => {
  console.info('Running cron jobs');

  // account cron jobs
  cronJobScheduler(accountCronSchedulerJobs, context);

  // application cron jobs
  cronJobScheduler(applicationCronSchedulerJobs, context);
};

export default cronJobs;
