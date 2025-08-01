import getCountryByField from '../../get-country-by-field';
import getCreditPeriodValueByField from '../../get-cover-period-value-by-field';
import getTotalContractValueByField from '../../get-total-contract-value-by-field';
import createAReferenceNumber from '../../create-a-reference-number';
import createABroker from '../../create-a-broker';
import createABusiness from '../../create-a-business';
import createAPopulatedBuyer from '../../create-a-populated-buyer';
import createADeclaration from '../../create-a-declaration';
import createAnEligibility from '../../create-an-eligibility';
import createAPolicy from '../../create-a-policy';
import createAPolicyContact from '../../create-a-policy-contact';
import createANominatedLossPayee from '../../create-a-nominated-loss-payee';
import createACompany from '../../create-a-company';
import createAnExportContract from '../../create-an-export-contract';
import createASectionReview from '../../create-a-section-review';
import { CreateApplicationRelationshipParams } from '../../../types';

/**
 * createApplicationRelationships
 * Create application relationships
 * 1) Get the buyer country
 * 2) Create a cover period value from the DB.
 * 3) Get a totalContractValue DB entry, for linking a relationship to eligibility.
 * 4) Create a new buyer with country and application relationship.
 * 5) Create a new eligibility with country and application relationship.
 * 6) Create a new export contract with an application relationship.
 * 7) Create a new policy with an application relationship.
 * 8) Create a new nominated loss payee with an application relationship.
 * 9) Create a new company with an application relationship.
 * 10) Create a new sectionReview with an application relationship
 * @param {Context} context: KeystoneJS context API
 * @param {string} applicationId: Application ID
 * @param {ApplicationCompanyCore} companyData: Company data
 * @param {ApplicationEligibility} eligibilityAnswers: Eligibility answers/data
 * @param {SectionReview} sectionReviewData: Section review data
 * @returns {Promise<Array<string>>} Application relationship IDs
 */
const createApplicationRelationships = async ({
  context,
  applicationId,
  companyData,
  eligibilityAnswers,
  sectionReviewData,
}: CreateApplicationRelationshipParams) => {
  try {
    console.info('Creating application relationships (createApplicationRelationships helper) for application %s', applicationId);

    const { buyerCountryIsoCode, totalContractValueId, coverPeriodId, ...otherEligibilityAnswers } = eligibilityAnswers;

    /**
     * Get a country's ID from the provided ISO code.
     * This is required to be used in:
     * 1) Eligibility buyer country relationship
     * 2) Buyer country relationship
     */
    const country = await getCountryByField(context, 'isoCode', buyerCountryIsoCode);

    if (!country) {
      console.error(
        'Unable to create application relationships - buyer country not found (createApplicationRelationships helper) for application %s',
        applicationId,
      );

      throw new Error(
        `Unable to create application relationships - buyer country not found (createApplicationRelationships helper) for application ${applicationId}`,
      );
    }

    const coverPeriod = await getCreditPeriodValueByField(context, 'valueId', coverPeriodId);
    const totalContractValue = await getTotalContractValueByField(context, 'valueId', totalContractValueId);

    const referenceNumber = await createAReferenceNumber(context, applicationId);

    const createdRelationships = await Promise.all([
      createABroker(context, applicationId),
      createABusiness(context, applicationId),
      createAPopulatedBuyer(context, country.id, applicationId),
      createADeclaration(context, applicationId),
      createAnEligibility(context, country.id, applicationId, coverPeriod.id, totalContractValue.id, otherEligibilityAnswers),
      createAnExportContract(context, applicationId),
      createAPolicy(context, applicationId),
      createAPolicyContact(context, applicationId),
      createANominatedLossPayee(context, applicationId),
      createACompany(context, applicationId, companyData),
      createASectionReview(context, applicationId, sectionReviewData),
    ]);

    const [broker, business, buyer, declaration, eligibility, exportContract, policy, policyContact, nominatedLossPayee, company, sectionReview] =
      createdRelationships;

    const relationshipIds = {
      brokerId: broker.id,
      businessId: business.id,
      buyerId: buyer.id,
      companyId: company.id,
      declarationId: declaration.id,
      eligibilityId: eligibility.id,
      exportContractId: exportContract.id,
      nominatedLossPayeeId: nominatedLossPayee.id,
      policyId: policy.id,
      policyContactId: policyContact.id,
      referenceNumber,
      sectionReviewId: sectionReview.id,
    };

    return relationshipIds;
  } catch (error) {
    console.error('Error creating application relationships (createApplicationRelationships helper) for application %s %o', applicationId, error);

    throw new Error(`Creating application relationships (createApplicationRelationships helper) for application ${applicationId} ${error}`);
  }
};

const applicationRelationships = {
  create: createApplicationRelationships,
};

export default applicationRelationships;
