import getExpiringApplications from '.';
import { createMultipleFullApplications, getKeystoneContext } from '../../test-helpers';
import applications from '../../test-helpers/applications';
import { Application, Context } from '../../types';
import { dateInTheFutureByDays } from '../date';
import { APPLICATION } from '../../constants';

const { IN_PROGRESS, ABANDONED, SUBMITTED } = APPLICATION.STATUS;
const { REMINDER_DAYS } = APPLICATION.SUBMISSION_DEADLINE_EMAIL;

const assertApplicationValues = (application: Application, expectedApplicationId: string) => {
  expect(application.id).toEqual(expectedApplicationId);
  expect(application.buyer.companyOrOrganisationName).toEqual('');
  expect(application.owner).toBeNull();
  expect(application.status).toEqual(IN_PROGRESS);
  expect(application.submissionDeadline).toBeDefined();
};

describe('api/helpers/get-expiring-applications', () => {
  let context: Context;
  let applicationArray: Array<Application>;

  const today = new Date();
  const twoDaysInFuture = dateInTheFutureByDays(today, REMINDER_DAYS);

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

      assertApplicationValues(result[0], applicationArray[3].id);
      assertApplicationValues(result[1], applicationArray[4].id);
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

  describe(`when one expired application has a status set as ${SUBMITTED}`, () => {
    beforeEach(async () => {
      const update = {
        ...updateData,
        status: SUBMITTED,
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
