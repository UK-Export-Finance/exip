import dotenv from 'dotenv';
import updateUnverifiedAccountsJob from './unverified-account-cron-job';
import updateUnverifiedAccounts from '../../helpers/update-unverified-accounts';
import { CRON_DESCRIPTION_ACCOUNT_UPDATE_UNVERIFIED } from '../../constants';

dotenv.config();

const { CRON_SCHEDULE_UNVERIFIED_ACCOUNT } = process.env;

describe('cron/account/unverified-account-cron-job', () => {
  it('should return an object with cronExpression, description and a task', () => {
    const expected = {
      cronExpression: String(CRON_SCHEDULE_UNVERIFIED_ACCOUNT),
      description: CRON_DESCRIPTION_ACCOUNT_UPDATE_UNVERIFIED,
      task: updateUnverifiedAccounts,
    };

    expect(updateUnverifiedAccountsJob).toEqual(expected);
  });
});
