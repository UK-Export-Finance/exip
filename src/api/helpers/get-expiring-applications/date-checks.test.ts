import getExpiringApplications from '.';
import { createFullApplication, getKeystoneContext } from '../../test-helpers';
import applications from '../../test-helpers/applications';
import { Application, Context } from '../../types';
import { dateInTheFutureByDays } from '../date';

const generateUpdateData = (dateString: string) => {
  const date = new Date(dateString);

  const twoDaysInFuture = dateInTheFutureByDays(date, 2);

  return {
    submissionDeadline: twoDaysInFuture,
  };
};

describe('api/helpers/get-expiring-applications/date-checks', () => {
  let context: Context;
  let application: Application;

  beforeAll(async () => {
    context = getKeystoneContext();
    jest.useFakeTimers({ advanceTimers: true });
  });

  afterAll(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  beforeEach(async () => {
    applications.deleteAll(context);
    application = await createFullApplication(context);
  });

  describe('1st of the month', () => {
    it('should return an array with 1 application', async () => {
      const date = '1/1/2024';

      jest.setSystemTime(new Date(date));

      const updateData = generateUpdateData(date);

      await applications.update({ context, applicationId: application.id, data: updateData });
      application = await applications.get({ context, applicationId: application.id });

      const result = await getExpiringApplications(context);

      expect(result.length).toEqual(1);
    });
  });

  describe('2nd of the month', () => {
    it('should return an array with 1 application', async () => {
      const date = '2024-01-02';

      jest.setSystemTime(new Date(date));

      const updateData = generateUpdateData(date);

      await applications.update({ context, applicationId: application.id, data: updateData });
      application = await applications.get({ context, applicationId: application.id });

      const result = await getExpiringApplications(context);

      expect(result.length).toEqual(1);
    });
  });

  describe('31st December', () => {
    it('should return an array with 1 application', async () => {
      const date = '2024-12-31';

      jest.setSystemTime(new Date(date));

      const updateData = generateUpdateData(date);

      await applications.update({ context, applicationId: application.id, data: updateData });
      application = await applications.get({ context, applicationId: application.id });

      const result = await getExpiringApplications(context);

      expect(result.length).toEqual(1);
    });
  });

  describe('Deadline on 1st of month', () => {
    it('should return an array with 1 application', async () => {
      const date = '2024-03-30';

      jest.setSystemTime(new Date(date));

      const updateData = generateUpdateData(date);

      await applications.update({ context, applicationId: application.id, data: updateData });
      application = await applications.get({ context, applicationId: application.id });

      const result = await getExpiringApplications(context);

      expect(result.length).toEqual(1);
    });
  });

  describe('Deadline on 2nd of month', () => {
    it('should return an array with 1 application', async () => {
      const date = '2024-03-31';

      jest.setSystemTime(new Date(date));

      const updateData = generateUpdateData(date);

      await applications.update({ context, applicationId: application.id, data: updateData });
      application = await applications.get({ context, applicationId: application.id });

      const result = await getExpiringApplications(context);

      expect(result.length).toEqual(1);
    });
  });

  describe('Deadline 1 day ahead and end of the month', () => {
    it('should return an empty array', async () => {
      const date = '2024-04-01';

      jest.setSystemTime(new Date(date));

      const updateDate = '2024-03-31';
      const updateData = generateUpdateData(updateDate);

      await applications.update({ context, applicationId: application.id, data: updateData });
      application = await applications.get({ context, applicationId: application.id });

      const result = await getExpiringApplications(context);

      expect(result.length).toEqual(0);
    });
  });

  describe('Deadline 3 days ahead and end of the month', () => {
    it('should return an empty array', async () => {
      const date = '2024-04-02';

      jest.setSystemTime(new Date(date));

      const updateDate = '2024-03-30';
      const updateData = generateUpdateData(updateDate);

      await applications.update({ context, applicationId: application.id, data: updateData });
      application = await applications.get({ context, applicationId: application.id });

      const result = await getExpiringApplications(context);

      expect(result.length).toEqual(0);
    });
  });

  describe('Deadline is the same day as now', () => {
    it('should return an empty array', async () => {
      const date = '2024-04-02';

      jest.setSystemTime(new Date(date));

      await applications.update({ context, applicationId: application.id, data: { submissionDeadline: date } });
      application = await applications.get({ context, applicationId: application.id });

      const result = await getExpiringApplications(context);

      expect(result.length).toEqual(0);
    });
  });
});
