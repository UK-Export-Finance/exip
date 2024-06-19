// @ts-ignore
import { Context, Application as KeystoneApplication } from '.keystone/types';
import getAccountById from '../get-account-by-id';
import getCountryByField from '../get-country-by-field';
import mapPolicy from './map-policy';
import getNominatedLossPayee from './nominated-loss-payee';
import { Application, ApplicationPolicy } from '../../types';

export const generateErrorMessage = (section: string, applicationId: number) =>
  `Getting populated application - no ${section} found for application ${applicationId}`;

interface GetPopulatedApplicationParams {
  context: Context;
  application: KeystoneApplication;
  decryptFinancialUk?: boolean;
  decryptFinancialInternational?: boolean;
}

/**
 * getPopulatedApplication
 * Get data associated with an application
 * @param {Context} KeystoneJS context API
 * @param {Application}
 * @returns {Promise<Object>} Populated application
 */
const getPopulatedApplication = async ({
  context,
  application,
  decryptFinancialUk = false,
  decryptFinancialInternational = false,
}: GetPopulatedApplicationParams): Promise<Application> => {
  console.info(`Getting populated application (helper) ${application.id}`);

  const {
    eligibilityId,
    ownerId,
    policyId,
    policyContactId,
    exportContractId,
    companyId,
    businessId,
    brokerId,
    buyerId,
    declarationId,
    nominatedLossPayeeId,
    sectionReviewId,
  } = application;

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

  const policy = (await context.query.Policy.findOne({
    where: { id: policyId },
    query:
      'id policyType requestedStartDate contractCompletionDate totalValueOfContract creditPeriodWithBuyer policyCurrencyCode totalMonthsOfCover totalSalesToBuyer maximumBuyerWillOwe needPreCreditPeriodCover jointlyInsuredParty { id companyName companyNumber countryCode requested }',
  })) as ApplicationPolicy;

  if (!policy) {
    throw new Error(generateErrorMessage('policy', application.id));
  }

  const policyContact = await context.db.PolicyContact.findOne({
    where: { id: policyContactId },
  });

  if (!policyContact) {
    throw new Error(generateErrorMessage('policyContact', application.id));
  }

  const nominatedLossPayee = await getNominatedLossPayee(context, nominatedLossPayeeId, decryptFinancialUk, decryptFinancialInternational);

  const populatedPolicy = mapPolicy(policy);

  const exportContract = await context.db.ExportContract.findOne({
    where: { id: exportContractId },
  });

  if (!exportContract) {
    throw new Error(generateErrorMessage('exportContract', application.id));
  }

  const exportContractAgent = await context.db.ExportContractAgent.findOne({
    where: { id: exportContract.agentId },
  });

  if (!exportContractAgent) {
    throw new Error(generateErrorMessage('exportContractAgent', application.id));
  }

  const exportContractAgentService = await context.db.ExportContractAgentService.findOne({
    where: { id: exportContractAgent.serviceId },
  });

  if (!exportContractAgentService) {
    throw new Error(generateErrorMessage('exportContractAgentService', application.id));
  }

  const exportContractAgentServiceCharge = await context.db.ExportContractAgentServiceCharge.findOne({
    where: { id: exportContractAgentService.chargeId },
  });

  if (!exportContractAgentServiceCharge) {
    throw new Error(generateErrorMessage('exportContractAgentServiceCharge', application.id));
  }

  const privateMarket = await context.db.PrivateMarket.findOne({
    where: { id: exportContract.privateMarketId },
  });

  if (!privateMarket) {
    throw new Error(generateErrorMessage('privateMarket', application.id));
  }

  const finalDestinationCountry = await getCountryByField(context, 'isoCode', exportContract.finalDestinationCountryCode);

  const populatedExportContract = {
    ...exportContract,
    agent: {
      ...exportContractAgent,
      service: {
        ...exportContractAgentService,
        charge: exportContractAgentServiceCharge,
      },
    },
    finalDestinationCountry,
    privateMarket,
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

  if (!companyAddress) {
    throw new Error(generateErrorMessage('companyAddress', application.id));
  }

  const differentTradingAddress = await context.db.CompanyDifferentTradingAddress.findOne({
    where: { id: company.differentTradingAddressId },
  });

  if (!differentTradingAddress) {
    throw new Error(generateErrorMessage('differentTradingAddress', application.id));
  }

  const populatedCompany = {
    ...company,
    registeredOfficeAddress: companyAddress,
    differentTradingAddress,
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

  const buyerRelationship = await context.db.BuyerRelationship.findOne({
    where: { id: buyer.relationshipId },
  });

  if (!buyerRelationship) {
    throw new Error(generateErrorMessage('buyerRelationship', application.id));
  }

  const buyerTradingHistory = await context.db.BuyerTradingHistory.findOne({
    where: { id: buyer.buyerTradingHistoryId },
  });

  if (!buyerTradingHistory) {
    throw new Error(generateErrorMessage('buyerTradingHistory', application.id));
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
    relationship: buyerRelationship,
    buyerTradingHistory,
  };

  const declaration = await context.db.Declaration.findOne({
    where: { id: declarationId },
  });

  if (!declaration) {
    throw new Error(generateErrorMessage('declaration', application.id));
  }

  const sectionReview = await context.db.SectionReview.findOne({
    where: { id: sectionReviewId },
  });

  if (!sectionReview) {
    throw new Error(generateErrorMessage('sectionReview', application.id));
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
    policy: populatedPolicy,
    policyContact,
    nominatedLossPayee,
    sectionReview,
  };

  return populatedApplication;
};

const populatedApplication = {
  get: getPopulatedApplication,
};

export default populatedApplication;
