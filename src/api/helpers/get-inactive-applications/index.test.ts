import getInactiveApplications from '.';
import { createMultipleFullApplications, getKeystoneContext } from '../../test-helpers';
import applications from '../../test-helpers/applications';
import { Application, Context } from '../../types';
import { APPLICATION, DATE_2_MONTHS_IN_THE_PAST } from '../../constants';

const { IN_PROGRESS, ABANDONED } = APPLICATION.STATUS;

describe('api/helpers/get-inactive-applications', () => {
  let context: Context;
  let applicationArray: Array<Application>;

  const updateData = {
    submissionDeadline: DATE_2_MONTHS_IN_THE_PAST(),
  };

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    applicationArray = await createMultipleFullApplications(context);
  });

  describe('no inactive applications', () => {
    it('should return an empty array', async () => {
      const result = await getInactiveApplications(context);

      expect(result).toEqual([]);
    });
  });

  describe('when inactive applications are present', () => {
    beforeEach(async () => {
      await applications.update({ context, applicationId: applicationArray[3].id, data: updateData });
      await applications.update({ context, applicationId: applicationArray[4].id, data: updateData });
    });

    it('should return an array with the inactive applications', async () => {
      const result = await getInactiveApplications(context);

      const expected = [
        {
          id: applicationArray[3].id,
          status: IN_PROGRESS,
        },
        {
          id: applicationArray[4].id,
          status: IN_PROGRESS,
        },
      ];

      expect(result).toEqual(expected);
    });
  });

  describe(`when one inactive application already has the status set as ${ABANDONED}`, () => {
    beforeEach(async () => {
      const update = {
        ...updateData,
        status: ABANDONED,
      };

      await applications.update({ context, applicationId: applicationArray[3].id, data: updateData });
      await applications.update({ context, applicationId: applicationArray[4].id, data: updateData });
      await applications.update({ context, applicationId: applicationArray[5].id, data: update });
    });

    it('should return an array with the 2 inactive applications', async () => {
      const result = await getInactiveApplications(context);

      expect(result.length).toEqual(2);
    });
  });
});
