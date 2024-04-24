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
 * @param {Application}
 * @returns {Promise<Object>} Populated application
 */
const getPopulatedApplication = async (context: Context, application: KeystoneApplication): Promise<Application> => {
  console.info('Getting populated application');
  const { eligibilityId, ownerId, policyId, policyContactId, exportContractId, companyId, businessId, brokerId, buyerId, declarationId, nominatedLossPayeeId } =
    application;

  const eligibility = await context.db.Eligibility.findOne({
    where: { id: eligibilityId },
  });

  if (!eligibility) {
    throw new Error(generateErrorMessage('eligibility', application.id));
  }

  const coverPeriod = await context.db.CoverPeriod.findOne({
    where: { id: eligibility.coverPeriodId },
  });

  if (!coverPeriod) {
    throw new Error(generateErrorMessage('coverPeriod', application.id));
  }

  const totalContractValue = await context.db.TotalContractValue.findOne({
    where: { id: eligibility.totalContractValueId },
  });

  if (!totalContractValue) {
    throw new Error(generateErrorMessage('totalContractValue', application.id));
  }

  const account = await getAccountById(context, ownerId);

  if (!account) {
    throw new Error(generateErrorMessage('account', application.id));
  }

  const policy = await context.db.Policy.findOne({
    where: { id: policyId },
  });

  if (!policy) {
    throw new Error(generateErrorMessage('policy', application.id));
  }

  const policyContact = await context.db.PolicyContact.findOne({
    where: { id: policyContactId },
  });

  if (!policyContact) {
    throw new Error(generateErrorMessage('policyContact', application.id));
  }

  const exportContract = await context.db.ExportContract.findOne({
    where: { id: exportContractId },
  });

  if (!exportContract) {
    throw new Error(generateErrorMessage('exportContract', application.id));
  }

  const finalDestinationCountry = await getCountryByField(context, 'isoCode', exportContract.finalDestinationCountryCode);

  const populatedExportContract = {
    ...exportContract,
    finalDestinationCountry,
  };

  const company = await context.db.Company.findOne({
    where: { id: companyId },
  });

  if (!company) {
    throw new Error(generateErrorMessage('company', application.id));
  }

  const companySicCodes = await context.db.CompanySicCode.findMany({
    where: {
      company: {
        id: { equals: company.id },
      },
    },
  });

  if (!company) {
    throw new Error(generateErrorMessage('companySicCode', application.id));
  }

  const companyAddress = await context.db.CompanyAddress.findOne({
    where: { id: company.registeredOfficeAddressId },
  });

  const populatedCompany = {
    ...company,
    registeredOfficeAddress: companyAddress,
  };

  const business = await context.db.Business.findOne({
    where: { id: businessId },
  });

  if (!business) {
    throw new Error(generateErrorMessage('business', application.id));
  }

  const broker = await context.db.Broker.findOne({
    where: { id: brokerId },
  });

  if (!broker) {
    throw new Error(generateErrorMessage('broker', application.id));
  }

  const buyer = await context.db.Buyer.findOne({
    where: { id: buyerId },
  });

  if (!buyer) {
    throw new Error(generateErrorMessage('buyer', application.id));
  }

  const nominatedLossPayee = await context.query.NominatedLossPayee.findOne({
    where: { id: nominatedLossPayeeId },
    query:
      'id financialUk { id accountNumber accountNumberVector sortCode sortCodeVector bankAddress } financialInternational { id } isAppointed isLocatedInUk isLocatedInternationally name',
  });

  if (!nominatedLossPayee) {
    console.error('%s', generateErrorMessage('nominated loss payee', application.id));
    throw new Error(generateErrorMessage('nominated loss payee', application.id));
  }

  const buyerCountry = await context.db.Country.findOne({
    where: { id: buyer.countryId },
  });

  if (!buyerCountry) {
    throw new Error(generateErrorMessage('populated buyer', application.id));
  }

  const populatedEligibility = {
    ...eligibility,
    buyerCountry,
    coverPeriod,
    totalContractValue,
  };

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
    eligibility: populatedEligibility,
    broker,
    business,
    buyer: populatedBuyer,
    company: populatedCompany,
    companySicCodes,
    declaration,
    exportContract: populatedExportContract,
    owner: account,
    policy,
    policyContact,
    nominatedLossPayee,
  };

  return populatedApplication;
};

export default getPopulatedApplication;
