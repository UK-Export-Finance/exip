import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import updateApplication from '.';
import baseConfig from '../../keystone';
import { Application, Context } from '../../types';
import applications from '../../test-helpers/applications';

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

dotenv.config();

const context = getContext(config, PrismaModule) as Context;

describe('helpers/update-application', () => {
  let application: Application;

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
