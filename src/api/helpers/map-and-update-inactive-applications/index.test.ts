import mapAndUpdateInactiveApplications from '.';
import { APPLICATION } from '../../constants';
import { createFullApplication, getKeystoneContext } from '../../test-helpers';
import { Application, Context } from '../../types';

const { IN_PROGRESS, ABANDONED } = APPLICATION.STATUS;

describe('helpers/map-and-update-inactive-applications', () => {
  let context: Context;
  let application: Application;

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    application = await createFullApplication(context);
  });

  describe('when an application is passed', () => {
    it(`should change the status on that application to ${ABANDONED}`, async () => {
      const applications = [
        {
          id: application.id,
          status: IN_PROGRESS,
        },
      ];

      await mapAndUpdateInactiveApplications(applications, context);

      const expected = await context.query.Application.findOne({
        where: { id: application.id },
        query: 'id status previousStatus',
      });

      expect(expected.status).toEqual(ABANDONED);
      expect(expected.previousStatus).toEqual(IN_PROGRESS);
    });
  });
});
