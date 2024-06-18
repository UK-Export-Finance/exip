import applicationCronSchedulerJobs from '.';
import updateInactiveApplicationsJob from './inactive-application-cron-job';
import sendEmailApplicationSubmissionDeadlineJob from './email-submission-deadline-reminder-cron-job';

describe('cron/application', () => {
  describe('applicationCronSchedulerJobs', () => {
    it('should have an array of application cron jobs', () => {
      const expected = [updateInactiveApplicationsJob, sendEmailApplicationSubmissionDeadlineJob];

      expect(applicationCronSchedulerJobs).toEqual(expected);
    });
  });
});
