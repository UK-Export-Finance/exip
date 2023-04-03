import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import { Context } from '.keystone/types'; // eslint-disable-line
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import baseConfig from '../keystone';
import { createFullApplication } from '../test-helpers';
import getPopulatedApplication from './get-populated-application';

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

dotenv.config();

const context = getContext(config, PrismaModule) as Context;

describe('api/helpers/get-populated-application', () => {
  it('should return an application with associated data', async () => {
    const application = await createFullApplication(context);

    const applicationIds = {
      eligibilityId: application.eligibility.id,
      policyAndExportId: application.policyAndExport.id,
      exporterCompanyId: application.exporterCompany.id,
      exporterBusinessId: application.exporterBusiness.id,
      exporterBrokerId: application.exporterBroker.id,
      buyerId: application.buyer.id,
    };

    const result = await getPopulatedApplication(context, applicationIds);

    expect(result.eligibility.id).toEqual(application.eligibility.id);
    expect(result.policyAndExport.id).toEqual(application.policyAndExport.id);
    expect(result.exporterCompany.id).toEqual(application.exporterCompany.id);
    expect(result.exporterBusiness.id).toEqual(application.exporterBusiness.id);
    expect(result.exporterBroker.id).toEqual(application.exporterBroker.id);
    expect(result.buyer.id).toEqual(application.buyer.id);
  });
});
