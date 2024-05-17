import dotenv from 'dotenv';
import updateUnverifiedAccounts from '../../helpers/update-unverified-accounts';
import { CRON_DESCRIPTION_ACCOUNT_UPDATE_UNVERIFIED } from '../../constants';
import { CronSchedulerJob } from '../../types';

dotenv.config();

const { CRON_SCHEDULE_UNVERIFIED_ACCOUNT } = process.env;

/**
 * updateUnverifiedAccountsJob
 * CronSchedulerJob object which contains:
 * cronExpression: schedule on which the cron job runs - '* * * * * *'
 * description: description of cronjob
 * task: function which cron job runs - updateUnverifiedAccounts
 */
const updateUnverifiedAccountsJob: CronSchedulerJob = {
  cronExpression: String(CRON_SCHEDULE_UNVERIFIED_ACCOUNT),
  description: CRON_DESCRIPTION_ACCOUNT_UPDATE_UNVERIFIED,
  task: updateUnverifiedAccounts,
};

export default updateUnverifiedAccountsJob;
