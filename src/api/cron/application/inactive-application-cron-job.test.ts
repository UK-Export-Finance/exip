import dotenv from 'dotenv';
import updateInactiveApplicationsJob from './inactive-application-cron-job';
import updateInactiveApplications from '../../helpers/update-inactive-applications';
import { UPDATE_INACTIVE_APPLICATION_DESCRIPTION } from '../../constants';

dotenv.config();

const { CRON_SCHEDULE_INACTIVE_APPLICATION } = process.env;

describe('cron/application/inactive-application-cron-job', () => {
  it('should return an object with cronExpression, description and a task', () => {
    const expected = {
      cronExpression: String(CRON_SCHEDULE_INACTIVE_APPLICATION),
      description: UPDATE_INACTIVE_APPLICATION_DESCRIPTION,
      task: updateInactiveApplications,
    };

    expect(updateInactiveApplicationsJob).toEqual(expected);
  });
});
