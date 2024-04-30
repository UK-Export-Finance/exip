import getInactiveApplications from '.';
import { createFullApplication, getKeystoneContext } from '../../test-helpers';
import { Application, Context } from '../../types';

import { APPLICATION } from '../../constants';

const { IN_PROGRESS, ABANDONED } = APPLICATION.STATUS;

describe('api/helpers/get-inactive-applications', () => {
  let context: Context;
  let application4: Application;
  let application5: Application;
  let application6: Application;

  const now = new Date();
  const twoMonthsAgo = new Date(now.setDate(now.getDate() - 60));

  const updateData = {
    updatedAt: twoMonthsAgo,
  };

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    await createFullApplication(context);
    await createFullApplication(context);
    await createFullApplication(context);
    application4 = await createFullApplication(context);
    application5 = await createFullApplication(context);
    application6 = await createFullApplication(context);
  });

  describe('no inactive applications', () => {
    it('should return an empty array', async () => {
      const result = await getInactiveApplications(context);

      expect(result).toEqual([]);
    });
  });

  describe('when inactive applications are present', () => {
    beforeEach(async () => {
      await context.db.Application.updateOne({
        where: { id: application4.id },
        data: updateData,
      });

      await context.db.Application.updateOne({
        where: { id: application5.id },
        data: updateData,
      });
    });

    it('should return an array with the inactive applications', async () => {
      const result = await getInactiveApplications(context);

      const expected = [
        {
          id: application4.id,
          status: IN_PROGRESS,
        },
        {
          id: application5.id,
          status: IN_PROGRESS,
        },
      ];

      expect(result).toEqual(expected);
    });
  });

  describe(`when one inactive application already has the status set as ${ABANDONED}`, () => {
    beforeEach(async () => {
      await context.db.Application.updateOne({
        where: { id: application6.id },
        data: {
          ...updateData,
          status: ABANDONED,
        },
      });
    });

    it('should return an array with the 2 inactive applications', async () => {
      const result = await getInactiveApplications(context);

      expect(result.length).toEqual(2);
    });
  });
});
