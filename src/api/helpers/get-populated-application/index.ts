import { Context, Application as KeystoneApplication } from '.keystone/types'; // eslint-disable-line
import getAccountById from '../get-account-by-id';
import getCountryByField from '../get-country-by-field';
import { Application } from '../../types';

export const generateErrorMessage = (section: string, applicationId: number) =>
  `Getting populated application - no ${section} found for application ${applicationId}`;

/**
 * getPopulatedApplication
 * Get data associated with an application
 * @param {Object} KeystoneJS context API
 * @param {Object} Application
 * @returns {Object} Populated application
 */
const getPopulatedApplication = async (context: Context, application: KeystoneApplication): Promise<Application> => {
  console.info('Getting populated application');

  const { eligibilityId, ownerId, policyAndExportId, exporterCompanyId, exporterBusinessId, exporterBrokerId, buyerId, declarationId } = application;

  const eligibility = await context.db.Eligibility.findOne({
    where: { id: eligibilityId },
  });

  if (!eligibility) {
    throw new Error(generateErrorMessage('eligibility', application.id));
  }

  const account = await getAccountById(context, ownerId);

  if (!account) {
    throw new Error(generateErrorMessage('account', application.id));
  }

  const policyAndExport = await context.db.PolicyAndExport.findOne({
    where: { id: policyAndExportId },
  });

  if (!policyAndExport) {
    throw new Error(generateErrorMessage('policyAndExport', application.id));
  }

  const finalDestinationCountry = await getCountryByField(context, 'isoCode', policyAndExport.finalDestinationCountryCode);

  const populatedPolicyAndExport = {
    ...policyAndExport,
    finalDestinationCountryCode: finalDestinationCountry,
  };

  const exporterCompany = await context.db.ExporterCompany.findOne({
    where: { id: exporterCompanyId },
  });

  if (!exporterCompany) {
    throw new Error(generateErrorMessage('exporterCompany', application.id));
  }

  const exporterCompanyAddress = await context.db.ExporterCompanyAddress.findOne({
    where: { id: exporterCompany.registeredOfficeAddressId },
  });

  const populatedExporterCompany = {
    ...exporterCompany,
    registeredOfficeAddress: exporterCompanyAddress,
  };

  const exporterBusiness = await context.db.ExporterBusiness.findOne({
    where: { id: exporterBusinessId },
  });

  if (!exporterBusiness) {
    throw new Error(generateErrorMessage('exporterBusiness', application.id));
  }

  const exporterBroker = await context.db.ExporterBroker.findOne({
    where: { id: exporterBrokerId },
  });

  if (!exporterBroker) {
    throw new Error(generateErrorMessage('exporterBroker', application.id));
  }

  const buyer = await context.db.Buyer.findOne({
    where: { id: buyerId },
  });

  if (!buyer) {
    throw new Error(generateErrorMessage('buyer', application.id));
  }

  const buyerCountry = await context.db.Country.findOne({
    where: { id: buyer.countryId },
  });

  if (!buyerCountry) {
    throw new Error(generateErrorMessage('populated buyer', application.id));
  }

  const populatedBuyer = {
    ...buyer,
    country: buyerCountry,
  };

  const declaration = await context.db.Declaration.findOne({
    where: { id: declarationId },
  });

  if (!declaration) {
    throw new Error(generateErrorMessage('declaration', application.id));
  }

  const populatedApplication = {
    ...application,
    eligibility: {
      ...eligibility,
      buyerCountry,
    },
    policyAndExport: populatedPolicyAndExport,
    owner: account,
    exporterCompany: populatedExporterCompany,
    exporterBusiness,
    exporterBroker,
    buyer: populatedBuyer,
    declaration,
  };

  return populatedApplication;
};

export default getPopulatedApplication;
