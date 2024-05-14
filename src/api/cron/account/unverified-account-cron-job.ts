import dotenv from 'dotenv';
import updateUnverifiedAccounts from '../../helpers/update-unverified-accounts';
import { CronSchedulerJob } from '../../types';

dotenv.config();

const { UNVERIFIED_ACCOUNT_SCHEDULE } = process.env;

const unverifiedAccountSchedule = UNVERIFIED_ACCOUNT_SCHEDULE as string;

/**
 * updateUnverifiedAccountsJob
 * CronSchedulerJob object which contains:
 * cronExpression: schedule on which the cron job runs - '* * * * * *'
 * description: description of cronjob
 * task: function which cron job runs - updateUnverifiedAccounts
 */
export const updateUnverifiedAccountsJob: CronSchedulerJob = {
  cronExpression: unverifiedAccountSchedule,
  description: 'Update unverified accounts (over 24hrs) to isInactive',
  task: updateUnverifiedAccounts,
};
