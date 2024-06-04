import updateInactiveApplications from '.';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import { createFullApplication } from '../../test-helpers';
import { APPLICATION, DATE_2_MONTHS_IN_THE_PAST } from '../../constants';
import applications from '../../test-helpers/applications';
import { Application, Context } from '../../types';

const { IN_PROGRESS, ABANDONED } = APPLICATION.STATUS;

describe('helpers/update-inactive-applications', () => {
  let context: Context;
  let application: Application;

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    application = await createFullApplication(context);

    application = await applications.update({ context, applicationId: application.id, data: { submissionDeadline: DATE_2_MONTHS_IN_THE_PAST() } });
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe(`successfully updates inactive application to ${ABANDONED}`, () => {
    it('should return success as true', async () => {
      const { success } = await updateInactiveApplications(context);

      expect(success).toEqual(true);
    });

    it(`should set the application status to ${ABANDONED}`, async () => {
      await updateInactiveApplications(context);

      const expected = await context.query.Application.findOne({
        where: { id: application.id },
        query: 'id status previousStatus updatedAt',
      });

      expect(expected.status).toEqual(ABANDONED);
      expect(expected.previousStatus).toEqual(IN_PROGRESS);
      expect(expected.updatedAt).not.toEqual(application.updatedAt);
      expect(new Date(expected.updatedAt).getTime()).toBeGreaterThan(new Date(application.updatedAt).getTime());
    });
  });

  describe('when an error occurs whilst getting and updating inactive applications', () => {
    it('should throw an error', async () => {
      await expect(updateInactiveApplications()).rejects.toThrow('Error getting and updating inactive applications');
    });
  });
});
