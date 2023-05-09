import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import { Context, Application as KeystoneApplication } from '.keystone/types'; // eslint-disable-line
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import baseConfig from '../../keystone';
import getPopulatedApplication, { generateErrorMessage } from '.';
import { createFullApplication } from '../../test-helpers';
import mockCountries from '../../test-mocks/mock-countries';
import { Application } from '../../types';

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

dotenv.config();

const context = getContext(config, PrismaModule) as Context;

describe('api/helpers/get-populated-application', () => {
  let applicationIds: KeystoneApplication;
  let application: Application;

  beforeEach(async () => {
    application = await createFullApplication(context);

    applicationIds = {
      id: application.id,
      eligibilityId: application.eligibility.id,
      policyAndExportId: application.policyAndExport.id,
      ownerId: application.owner.id,
      companyId: application.company.id,
      businessId: application.business.id,
      exporterBrokerId: application.exporterBroker.id,
      buyerId: application.buyer.id,
      declarationId: application.declaration.id,
    };
  });

  it('should return an application with associated data', async () => {
    const result = await getPopulatedApplication(context, applicationIds);

    expect(result.eligibility.id).toEqual(application.eligibility.id);
    expect(result.policyAndExport.id).toEqual(application.policyAndExport.id);
    expect(result.owner.id).toEqual(application.owner.id);
    expect(result.company.id).toEqual(application.company.id);
    expect(result.business.id).toEqual(application.business.id);
    expect(result.exporterBroker.id).toEqual(application.exporterBroker.id);
    expect(result.buyer.id).toEqual(application.buyer.id);

    expect(result.declaration.id).toEqual(application.declaration.id);
  });

  it('should return an application with populated buyer country', async () => {
    const result = await getPopulatedApplication(context, applicationIds);

    const expectedCountry = mockCountries[0];

    expect(result.buyer.country?.name).toEqual(expectedCountry.name);
    expect(result.buyer.country?.isoCode).toEqual(expectedCountry.isoCode);
  });

  it('should throw an error when eligibility does not exist', async () => {
    const invalidId = applicationIds.policyAndExportId;

    try {
      await getPopulatedApplication(context, { ...applicationIds, eligibilityId: invalidId });
    } catch (err) {
      const expected = new Error(generateErrorMessage('eligibility', applicationIds.id));
      expect(err).toEqual(expected);
    }
  });

  it('should throw an error when exporter does not exist', async () => {
    const invalidId = applicationIds.policyAndExportId;

    try {
      await getPopulatedApplication(context, { ...applicationIds, accountId: invalidId });
    } catch (err) {
      const expected = new Error(generateErrorMessage('exporter', applicationIds.id));
      expect(err).toEqual(expected);
    }
  });

  it('should throw an error when buyerCountry does not exist', async () => {
    const invalidId = applicationIds.policyAndExportId;

    try {
      await getPopulatedApplication(context, { ...applicationIds, buyerCountryId: invalidId });
    } catch (err) {
      const expected = new Error(generateErrorMessage('buyerCountry', applicationIds.id));
      expect(err).toEqual(expected);
    }
  });

  it('should throw an error when policyAndExport does not exist', async () => {
    const invalidId = applicationIds.id;

    try {
      await getPopulatedApplication(context, { ...applicationIds, policyAndExportId: invalidId });
    } catch (err) {
      const expected = new Error(generateErrorMessage('policyAndExport', applicationIds.id));
      expect(err).toEqual(expected);
    }
  });

  it('should throw an error when company does not exist', async () => {
    const invalidId = applicationIds.id;

    try {
      await getPopulatedApplication(context, { ...applicationIds, companyId: invalidId });
    } catch (err) {
      const expected = new Error(generateErrorMessage('company', applicationIds.id));
      expect(err).toEqual(expected);
    }
  });

  it('should throw an error when business does not exist', async () => {
    const invalidId = applicationIds.id;

    try {
      await getPopulatedApplication(context, { ...applicationIds, businessId: invalidId });
    } catch (err) {
      const expected = new Error(generateErrorMessage('business', applicationIds.id));
      expect(err).toEqual(expected);
    }
  });

  it('should throw an error when exporterBroker does not exist', async () => {
    const invalidId = applicationIds.id;

    try {
      await getPopulatedApplication(context, { ...applicationIds, exporterBrokerId: invalidId });
    } catch (err) {
      const expected = new Error(generateErrorMessage('exporterBroker', applicationIds.id));
      expect(err).toEqual(expected);
    }
  });

  it('should throw an error when buyer does not exist', async () => {
    const invalidId = applicationIds.id;

    try {
      await getPopulatedApplication(context, { ...applicationIds, buyerId: invalidId });
    } catch (err) {
      const expected = new Error(generateErrorMessage('buyer', applicationIds.id));
      expect(err).toEqual(expected);
    }
  });

  it('should throw an error when buyer country does not exist', async () => {
    const invalidId = applicationIds.id;

    try {
      await getPopulatedApplication(context, { ...applicationIds, buyer: { countryId: invalidId } });
    } catch (err) {
      const expected = new Error(generateErrorMessage('buyer', applicationIds.id));
      expect(err).toEqual(expected);
    }
  });

  it('should throw an error when declaration does not exist', async () => {
    const invalidId = applicationIds.id;

    try {
      await getPopulatedApplication(context, { ...applicationIds, declarationId: invalidId });
    } catch (err) {
      const expected = new Error(generateErrorMessage('declaration', applicationIds.id));
      expect(err).toEqual(expected);
    }
  });
});
