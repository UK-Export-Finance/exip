import applicationCronSchedulerJobs from '.';
import updateInactiveApplicationsJob from './inactive-application-cron-job';

describe('cron/application', () => {
  describe('applicationCronSchedulerJobs', () => {
    it('should have an array of application cron jobs', () => {
      const expected = [updateInactiveApplicationsJob];

      expect(applicationCronSchedulerJobs).toEqual(expected);
    });
  });
});
