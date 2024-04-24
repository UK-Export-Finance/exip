import getApplicationByReferenceNumber from '.';
import applications from '../../test-helpers/applications';
import { Application, Context } from '../../types';
import getKeystoneContext from '../../test-helpers/get-keystone-context';

describe('api/helpers/get-application-by-reference-number', () => {
  let context: Context;
  let application: Application;

  beforeAll(async () => {
    context = getKeystoneContext();

    application = (await applications.create({
      context,
      data: {},
    })) as Application;
  });

  describe('when application cannot be found', () => {
    const referenceNumber = 0;

    it('should return an empty object', async () => {
      const result = await getApplicationByReferenceNumber(referenceNumber, context);

      expect(result).toEqual(null);
    });
  });

  describe('when an application is found', () => {
    it("should return the application's ids", async () => {
      const { referenceNumber } = application;

      const result = await getApplicationByReferenceNumber(referenceNumber, context);

      const expected = (await context.db.Application.findMany({
        where: {
          referenceNumber: { equals: referenceNumber },
        },
      })) as Array<Application>;

      const [expectedApplication] = expected;

      expect(result).toEqual(expectedApplication);
    });
  });

  describe('when the an error occurs', () => {
    it('should throw an error', async () => {
      await expect(getApplicationByReferenceNumber()).rejects.toThrow('Error getting application by reference number');
    });
  });
});
