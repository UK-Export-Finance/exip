import accountCronSchedulerJobs from '.';
import updateUnverifiedAccountsJob from './unverified-account-cron-job';

describe('cron/account', () => {
  describe('accountCronSchedulerJobs', () => {
    it('should have an array of account cron jobs', () => {
      const expected = [updateUnverifiedAccountsJob];

      expect(accountCronSchedulerJobs).toEqual(expected);
    });
  });
});
