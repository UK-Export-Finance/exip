import dotenv from 'dotenv';
import { updateInactiveApplicationsJob } from './inactive-application-cron-job';
import updateInactiveApplications from '../../helpers/update-inactive-applications';

dotenv.config();

const { INACTIVE_APPLICATION_SCHEDULE } = process.env;

const inactiveApplicationSchedule = INACTIVE_APPLICATION_SCHEDULE as string;

describe('cron/application/inactive-application-cron-job', () => {
  describe('updateInactiveApplicationsJob', () => {
    it('should return an object with cronExpression, description and a task', () => {
      const expected = {
        cronExpression: inactiveApplicationSchedule,
        description: 'Update inactive applications (over 30 days) to Abandoned',
        task: updateInactiveApplications,
      };

      expect(updateInactiveApplicationsJob).toEqual(expected);
    });
  });
});
