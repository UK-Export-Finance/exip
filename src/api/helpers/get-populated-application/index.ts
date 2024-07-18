import { Context, Application as KeystoneApplication } from '.keystone/types'; // eslint-disable-line
import getEligibilityById from '../get-eligibility-by-id';
import getCoverPeriodById from '../get-cover-period-by-id';
import getTotalContractValuedById from '../get-total-contract-value-by-id';
import getAccountById from '../get-account-by-id';
import getPolicyById from '../get-policy-by-id';
import getPolicyContactById from '../get-policy-contact-by-id';
import getNominatedLossPayee from './nominated-loss-payee';
import getPopulatedExportContract from '../get-populated-export-contract';
import getCompanyById from '../get-company-by-id';
import getCompanyAddressById from '../get-company-address-by-id';
import getCompanySicCodesByCompanyId from '../get-company-sic-codes-by-company-id';
import getCompanyDifferentTradingAddressById from '../get-company-different-trading-address-by-id';
import getBusinessById from '../get-business-by-id';
import getBrokerById from '../get-broker-by-id';
import getBuyerById from '../get-buyer-by-id';
import getBuyerRelationshipById from '../get-buyer-relationship-by-id';
import getBuyerTradingHistoryById from '../get-buyer-trading-history-by-id';
import getCountryById from '../get-country-by-id';
import getDeclarationById from '../get-declaration-by-id';
import getSectionReviewById from '../get-section-review-by-id';
import mapTotalContractValueOverThreshold from '../map-total-contract-value-over-threshold';
import mapPolicy from './map-policy';
import { Application } from '../../types';

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
  try {
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

    const populatedExportContract = await getPopulatedExportContract(context, exportContractId);

    const company = await getCompanyById(context, companyId);

    const companyAddress = await getCompanyAddressById(context, company.registeredOfficeAddressId);

    const companySicCodes = await getCompanySicCodesByCompanyId(context, company.id);

    const differentTradingAddress = await getCompanyDifferentTradingAddressById(context, company.differentTradingAddressId);

    const populatedCompany = {
      ...company,
      registeredOfficeAddress: companyAddress,
      differentTradingAddress,
    };

    const business = await getBusinessById(context, businessId);

    const broker = await getBrokerById(context, brokerId);

    const buyer = await getBuyerById(context, buyerId);

    const buyerRelationship = await getBuyerRelationshipById(context, buyer.relationshipId);

    const buyerTradingHistory = await getBuyerTradingHistoryById(context, buyer.buyerTradingHistoryId);

    const buyerCountry = await getCountryById(context, buyer.countryId);

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

    const declaration = await getDeclarationById(context, declarationId);

    const sectionReview = await getSectionReviewById(context, sectionReviewId);

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
  } catch (err) {
    console.error(`Getting populated application (helper) ${application.id} %O`, err);

    throw new Error(`Error Getting populated application (helper) ${application.id} ${err}`);
  }
};

const populatedApplication = {
  get: getPopulatedApplication,
};

export default populatedApplication;
