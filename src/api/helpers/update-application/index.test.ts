import updateApplication from '.';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import { Application, Context } from '../../types';
import applications from '../../test-helpers/applications';

describe('helpers/update-application', () => {
  let context: Context;
  let application: Application;

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    // create a new application
    const applicationData = {};

    application = (await applications.create({ context, data: applicationData })) as Application;
  });

  it('should update the updatedAt timestamp', async () => {
    await updateApplication.timestamp(context, application.id);

    const latestApplication = (await context.query.Application.findOne({
      where: {
        id: application.id,
      },
      query: 'updatedAt',
    })) as Application;

    expect(latestApplication.updatedAt).not.toEqual(application.updatedAt);
  });

  describe('when an application is not found', () => {
    beforeEach(async () => {
      // delete the application so it will not be found
      await context.query.Application.deleteOne({
        where: { id: application.id },
      });
    });

    it('should throw an error', async () => {
      try {
        await updateApplication.timestamp(context, application.id);
      } catch (err) {
        const expectedKeystoneError = 'Access denied: You cannot update that Application - it may not exist';

        const expected = new Error(`Updating application updatedAt timestamp ${expectedKeystoneError}`);

        expect(err).toEqual(expected);
      }
    });
  });
});
