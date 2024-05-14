import dotenv from 'dotenv';
import { updateUnverifiedAccountsJob } from './unverified-account-cron-job';
import updateUnverifiedAccounts from '../../helpers/update-unverified-accounts';

dotenv.config();

const { UNVERIFIED_ACCOUNT_SCHEDULE } = process.env;

const unverifiedAccountSchedule = UNVERIFIED_ACCOUNT_SCHEDULE as string;

describe('cron/account/unverified-account-cron-job', () => {
  describe('updateUnverifiedAccountsJob', () => {
    it('should return an object with cronExpression, description and a task', () => {
      const expected = {
        cronExpression: unverifiedAccountSchedule,
        description: 'Update unverified accounts (over 24hrs) to isInactive',
        task: updateUnverifiedAccounts,
      };

      expect(updateUnverifiedAccountsJob).toEqual(expected);
    });
  });
});
