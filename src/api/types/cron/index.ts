import * as cron from 'node-cron';
import { SuccessResponse } from '../generic';
import { Context } from '.keystone/types'; // eslint-disable-line

export type CronScheduleFunc = Parameters<typeof cron.schedule>[1];

// eslint-disable-next-line @typescript-eslint/ban-types
type CronScheduleFuncParameters = Parameters<Extract<CronScheduleFunc, Function>>[0];

/**
 * The `now` parameter is provided here as
 * node-cron's schedule function expects tasks to take this parameter.
 * eslint disable required as variables need to be defined for cron jobs (but not used in this file)
 */
// eslint-disable-next-line no-unused-vars
export type CronSchedulerJobTask = (context: Context, now: CronScheduleFuncParameters) => Promise<SuccessResponse>;

export type CronSchedulerJob = {
  /**
   * A cron expression representing when the job will run
   */
  cronExpression: string;
  /**
   * A description of the job
   */
  description: string;
  /**
   * The task to be run by the job
   */
  task: CronSchedulerJobTask;
};

interface CronWhereUpdate {
  id: string;
}

interface CronApplicationDataUpdate {
  status: string;
  previousStatus: string;
  updatedAt?: Date;
}

export interface CronApplicationInactiveUpdate {
  where: CronWhereUpdate;
  data: CronApplicationDataUpdate;
}

interface CronAccountStatusDataUpdate {
  isInactive: boolean;
  updatedAt: Date;
}

interface CronAccountDataUpdate {
  updatedAt: Date;
}

export interface CronAccountStatusUnverifiedUpdate {
  where: CronWhereUpdate;
  data: CronAccountStatusDataUpdate;
}

export interface CronAccountUpdate {
  where: CronWhereUpdate;
  data: CronAccountDataUpdate;
}
