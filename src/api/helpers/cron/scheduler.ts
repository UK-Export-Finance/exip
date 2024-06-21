import { CronScheduleFunc, CronSchedulerJobTask } from '../../types';
import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * asyncTaskToSyncTask
 * 'node-cron' requires the task function to be synchronous (return type `void`)
 * but some of the scheduler functions are asynchronous (return type
 * `Promise<SuccessResponse>`). This function takes in any task and uses an IIFE to turn it
 * into a synchronous function
 * @param {CronSchedulerJobTask} task: function which cron job runs
 * @param {Context} KeystoneJS context API
 */
export const asyncTaskToSyncTask =
  (task: CronSchedulerJobTask, context: Context): CronScheduleFunc =>
    (now) => {
      (async () => {
        await task(context, now);
      })();
    };

/**
 * taskWithErrorLogging
 * Wraps the given task to add logging of any errors that occur during execution
 * @param {CronSchedulerJobTask} task: function which cron job runs
 * @param {Context} KeystoneJS context API
 */
export const taskWithErrorLogging =
  (description: string, task: CronSchedulerJobTask, context: Context): CronSchedulerJobTask =>
    async (_commonContext, now) => {
      try {
        await task(context, now);
      } catch (error) {
        console.error("An error occurred running job '%s' %o", description, error);
        throw error;
      }
    };
