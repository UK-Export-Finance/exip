import updateInactiveApplicationsMutation from '.';
import getKeystoneContext from '../../../test-helpers/get-keystone-context';
import { createFullApplication } from '../../../test-helpers';
import { APPLICATION } from '../../../constants';
import { Application, Context } from '../../../types';

const { IN_PROGRESS, ABANDONED } = APPLICATION.STATUS;

describe('custom-resolvers/update-inactive-applications', () => {
  let context: Context;
  let application: Application;

  const now = new Date();
  const twoMonthsAgo = new Date(now.setDate(now.getDate() - 60));

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    application = await createFullApplication(context);

    await context.db.Application.updateOne({
      where: { id: application.id },
      data: {
        updatedAt: twoMonthsAgo,
      },
    });
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe(`successfully updates inactive application to ${ABANDONED}`, () => {
    it('should return success as true', async () => {
      const { success } = await updateInactiveApplicationsMutation({}, context);

      expect(success).toEqual(true);
    });

    it(`should set the application status to ${ABANDONED}`, async () => {
      await updateInactiveApplicationsMutation({}, context);

      const expected = await context.query.Application.findOne({
        where: { id: application.id },
        query: 'id status previousStatus',
      });

      expect(expected.status).toEqual(ABANDONED);
      expect(expected.previousStatus).toEqual(IN_PROGRESS);
    });
  });

  describe('when an error occurs whilst getting and updating inactive applications', () => {
    it('should throw an error', async () => {
      await expect(updateInactiveApplicationsMutation()).rejects.toThrow('Error getting and updating inactive applications');
    });
  });
});
