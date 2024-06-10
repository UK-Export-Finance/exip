import getExpiringApplications from '.';
import { createMultipleFullApplications, getKeystoneContext } from '../../test-helpers';
import applications from '../../test-helpers/applications';
import { Application, Context } from '../../types';
import { dateInTheFutureByDays } from '../date';
import { APPLICATION } from '../../constants';

const { IN_PROGRESS, ABANDONED } = APPLICATION.STATUS;

describe('api/helpers/get-expiring-applications', () => {
  let context: Context;
  let applicationArray: Array<Application>;

  const today = new Date();
  const twoDaysInFuture = dateInTheFutureByDays(today, 2);

  const updateData = {
    submissionDeadline: twoDaysInFuture,
  };

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    applicationArray = await createMultipleFullApplications(context);
  });

  describe('no expiring applications', () => {
    it('should return an empty array', async () => {
      const result = await getExpiringApplications(context);

      expect(result).toEqual([]);
    });
  });

  describe('when expiring applications are present', () => {
    beforeEach(async () => {
      await applications.update({ context, applicationId: applicationArray[3].id, data: updateData });
      await applications.update({ context, applicationId: applicationArray[4].id, data: updateData });
    });

    it('should return an array with the expiring applications', async () => {
      const result = await getExpiringApplications(context);

      expect(result[0].id).toEqual(applicationArray[3].id);
      expect(result[0].buyer.companyOrOrganisationName).toEqual('');
      expect(result[0].owner).toEqual(null);
      expect(result[0].status).toEqual(IN_PROGRESS);
      expect(result[0].submissionDeadline).toBeDefined();

      expect(result[1].id).toEqual(applicationArray[4].id);
      expect(result[1].buyer.companyOrOrganisationName).toEqual('');
      expect(result[1].owner).toEqual(null);
      expect(result[1].status).toEqual(IN_PROGRESS);
      expect(result[1].submissionDeadline).toBeDefined();
    });
  });

  describe(`when one expired application has a status set as ${ABANDONED}`, () => {
    beforeEach(async () => {
      const update = {
        ...updateData,
        status: ABANDONED,
      };

      await applications.update({ context, applicationId: applicationArray[3].id, data: updateData });
      await applications.update({ context, applicationId: applicationArray[4].id, data: updateData });
      await applications.update({ context, applicationId: applicationArray[5].id, data: update });
    });

    it('should return an array with the 2 expired applications', async () => {
      const result = await getExpiringApplications(context);

      expect(result.length).toEqual(2);
    });
  });
});
