import { Context, Application } from '.keystone/types'; // eslint-disable-line

/**
 * getPopulatedApplication
 * Get data associated with an application
 * @param {Object} KeystoneJS context API
 * @param {Object} Application
 * @returns {Object} Populated application
 */
const getPopulatedApplication = async (context: Context, application: Application) => {
  const { eligibilityId, policyAndExportId, exporterCompanyId, exporterBusinessId, exporterBrokerId, buyerId } = application;

  const eligibility = await context.db.Eligibility.findOne({
    where: { id: eligibilityId },
  });

  const buyerCountry = await context.db.Country.findOne({
    where: { id: eligibility?.buyerCountryId },
  });

  const policyAndExport = await context.db.PolicyAndExport.findOne({
    where: { id: policyAndExportId },
  });

  const exporterCompany = await context.db.ExporterCompany.findOne({
    where: { id: exporterCompanyId },
  });

  const exporterBusiness = await context.db.ExporterBusiness.findOne({
    where: { id: exporterBusinessId },
  });

  const exporterBroker = await context.db.ExporterBroker.findOne({
    where: { id: exporterBrokerId },
  });

  const buyer = await context.db.Buyer.findOne({
    where: { id: buyerId },
  });

  const populatedApplication = {
    ...application,
    eligibility: {
      ...eligibility,
      buyerCountry,
    },
    policyAndExport,
    exporterCompany,
    exporterBusiness,
    exporterBroker,
    buyer,
  };

  return populatedApplication;
};

export default getPopulatedApplication;
