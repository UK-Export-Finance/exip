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
import getPopulatedDeclaration from '../get-populated-declaration';
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
 * EXPECTED_RELATIONSHIPS
 * Relationships that are expected to be populated with an application.
 */
export const EXPECTED_RELATIONSHIPS: Array<string> = [
  'eligibility',
  'broker',
  'business',
  'buyer',
  'company',
  'declaration',
  'exportContract',
  'owner',
  'policy',
  'policyContact',
  'nominatedLossPayee',
  'sectionReview',
];

/**
 * getPopulatedApplication
 * Get data associated with an application
 * @param {Context} context: KeystoneJS context API
 * @param {Application} application
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
    console.info('Getting populated application (helper) %s', application.id);

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

    const declaration = await getPopulatedDeclaration(context, declarationId);

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

    /**
     * Check that all expected relationships are populated.
     * If not, throw an error.
     * Otherwise, unexpected behaviours could occur.
     */
    Object.keys(populatedApplication).forEach((relationshipKey: string) => {
      if (EXPECTED_RELATIONSHIPS.includes(relationshipKey)) {
        if (!populatedApplication[relationshipKey]) {
          throw new Error(`Error getting '${relationshipKey}' relationship`);
        }
      }
    });

    return populatedApplication;
  } catch (error) {
    console.error('Getting populated application (helper) %s %o', application.id, error);

    throw new Error(`Error getting populated application (helper) ${application.id} ${error}`);
  }
};

const populatedApplication = {
  get: getPopulatedApplication,
};

export default populatedApplication;
