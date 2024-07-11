import dotenv from 'dotenv';
import updateInactiveApplicationsJob from './inactive-application-cron-job';
import updateInactiveApplications from '../../helpers/update-inactive-applications';
import { CRON_DESCRIPTION_APPLICATION_UPDATE_INACTIVE } from '../../constants';

dotenv.config();

const { CRON_SCHEDULE_INACTIVE_APPLICATION } = process.env;

describe('cron/application/inactive-application-cron-job', () => {
  it('should return an object with cronExpression, description and a task', () => {
    const expected = {
      cronExpression: String(CRON_SCHEDULE_INACTIVE_APPLICATION),
      description: CRON_DESCRIPTION_APPLICATION_UPDATE_INACTIVE,
      task: updateInactiveApplications,
    };

    expect(updateInactiveApplicationsJob).toEqual(expected);
  });
});
