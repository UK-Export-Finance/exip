import { cronJobScheduler } from '../../cron';
import { accountCronSchedulerJobs } from '../../cron/account';
import { applicationCronSchedulerJobs } from '../../cron/application';
import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * cronJobs
 * Middleware to run cron jobs
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
