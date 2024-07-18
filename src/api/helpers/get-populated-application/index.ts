import { Context, Application as KeystoneApplication } from '.keystone/types'; // eslint-disable-line
// import getAccountById from '../get-account-by-id';
import getCountryByField from '../get-country-by-field';
import mapPolicy from './map-policy';
import mapTotalContractValueOverThreshold from '../map-total-contract-value-over-threshold';
import { Application, ApplicationPolicy } from '../../types';


import getEligibilityById from '../get-eligibility-by-id';
import getCoverPeriodById from '../get-cover-period-by-id';
import getTotalContractValuedById from '../get-total-contract-value-by-id';
import getAccountById from '../get-account-by-id';
import getPolicyById from '../get-policy-by-id';
import getPolicyContactById from '../get-policy-contact-by-id';
import getNominatedLossPayee from './nominated-loss-payee';
import getExportContractById from '../get-export-contract-by-id';
import getExportContractAgentById from '../get-export-contract-agent-by-id';
import getExportContractAgentServiceById from '../get-export-contract-agent-service-by-id';
import getExportContractAgentServiceChargeById from '../get-export-contract-agent-service-charge-by-id';
import getPrivateMarketById from '../get-private-market-by-id';
import getCompanyById from '../get-company-by-id';
import getCompanyAddressById from '../get-company-address-by-id';
import getCompanySicCodesByCompanyId from '../get-company-sic-codes-by-company-id';
import getCompanyDifferentTradingAddressById from '../get-company-different-trading-address-by-id';



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

  const eligibility = await getEligibilityById(context, eligibilityId);

  const coverPeriod = await getCoverPeriodById(context, eligibility.coverPeriodId);

  const totalContractValue = await getTotalContractValuedById(context, eligibility.totalContractValueId);

  const account = await getAccountById(context, ownerId);

  const policy = await getPolicyById(context, policyId);

  const policyContact = await getPolicyContactById(context, policyContactId);

  // TODO: update this helper to use a "byId" function
  const nominatedLossPayee = await getNominatedLossPayee(context, nominatedLossPayeeId, decryptFinancialUk, decryptFinancialInternational);

  const exportContract = await getExportContractById(context, exportContractId);

  const exportContractAgent = await getExportContractAgentById(context, exportContract.agentId);

  const exportContractAgentService = await getExportContractAgentServiceById(context, exportContractAgent.serviceId);

  const exportContractAgentServiceCharge = await getExportContractAgentServiceChargeById(context, exportContractAgentService.chargeId);

  const privateMarket = await getPrivateMarketById(context, exportContract.privateMarketId);

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

  const company = await getCompanyById(context, companyId);

  const companyAddress = await getCompanyAddressById(context, company.registeredOfficeAddressId);

  const companySicCodes = await getCompanySicCodesByCompanyId(context, company.id);

  const differentTradingAddress = await getCompanyDifferentTradingAddressById(context, company.differentTradingAddressId);

  const populatedCompany = {
    ...company,
    registeredOfficeAddress: companyAddress,
    differentTradingAddress,
  };

  const business = await context.db.Business.findOne({
    where: { id: businessId },
  });

  const broker = await context.db.Broker.findOne({
    where: { id: brokerId },
  });

  const buyer = await context.db.Buyer.findOne({
    where: { id: buyerId },
  });

  const buyerRelationship = await context.db.BuyerRelationship.findOne({
    where: { id: buyer.relationshipId },
  });

  const buyerTradingHistory = await context.db.BuyerTradingHistory.findOne({
    where: { id: buyer.buyerTradingHistoryId },
  });

  const buyerCountry = await context.db.Country.findOne({
    where: { id: buyer.countryId },
  });

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

  const sectionReview = await context.db.SectionReview.findOne({
    where: { id: sectionReviewId },
  });

  const totalContractValueOverThreshold = mapTotalContractValueOverThreshold(populatedEligibility);

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
    policy: mapPolicy(policy),
    policyContact,
    nominatedLossPayee,
    sectionReview,
    totalContractValueOverThreshold,
  };

  return populatedApplication;
};

const populatedApplication = {
  get: getPopulatedApplication,
};

export default populatedApplication;
