import { Context, Application as KeystoneApplication } from '.keystone/types'; // eslint-disable-line
import getPopulatedEligibility from '../get-populated-eligibility';
import getAccountById from '../get-account-by-id';
import getPolicyById from '../get-policy-by-id';
import getPolicyContactById from '../get-policy-contact-by-id';
import getNominatedLossPayee from './nominated-loss-payee';
import getPopulatedExportContract from '../get-populated-export-contract';
import getPopulatedCompany from '../get-populated-company';
import getBusinessById from '../get-business-by-id';
import getBrokerById from '../get-broker-by-id';
import getPopulatedBuyer from '../get-populated-buyer';
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
 * @param {Boolean} decryptFinancialUk: should financialUk data be decrypted
 * @param {Boolean} decryptFinancialInternational: should financialInternational data be decrypted
 * @returns {Promise<Application>} Populated application
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

    const populatedBuyer = await getPopulatedBuyer(context, buyerId);

    const populatedEligibility = await getPopulatedEligibility(context, eligibilityId, populatedBuyer.country);

    const account = await getAccountById(context, ownerId);

    const policy = await getPolicyById(context, policyId);

    const policyContact = await getPolicyContactById(context, policyContactId);

    const nominatedLossPayee = await getNominatedLossPayee(context, nominatedLossPayeeId, decryptFinancialUk, decryptFinancialInternational);

    const populatedExportContract = await getPopulatedExportContract(context, exportContractId);

    const { companySicCodes, ...populatedCompany } = await getPopulatedCompany(context, companyId);

    const business = await getBusinessById(context, businessId);

    const broker = await getBrokerById(context, brokerId);

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
