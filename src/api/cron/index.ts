import * as cron from 'node-cron';
import { CronSchedulerJob } from '../types';
import { asyncTaskToSyncTask, taskWithErrorLogging } from '../helpers/cron/scheduler';
import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * cronJobScheduler
 * Validates and sets up cron jobs to run
 * @param {CronSchedulerJob[]} jobs: cron jobs to schedule to run
 * @param {Context} KeystoneJS context API
 */
export const cronJobScheduler = (jobs: CronSchedulerJob[], context: Context) => {
  jobs.forEach((job) => {
    const { cronExpression, description, task } = job;

    if (!cron.validate(cronExpression)) {
      console.error("Failed to add scheduled job '%s' due to invalid cron expression: '%s'", description, cronExpression);
      return;
    }

    console.info("Adding scheduled job '%s' on schedule '%s'", description, cronExpression);
    cron
      .schedule(cronExpression, asyncTaskToSyncTask(taskWithErrorLogging(description, task, context), context))
      .on('error', (error) => console.error("An error occurred scheduling job '%s' %o", description, error));
  });
};
