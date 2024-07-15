import getAccountById from '../get-account-by-id';
import initialApplication from './create-initial-application';
import applicationRelationships from './create-application-relationships';
import applicationColumns from './update-application-columns';
import { CreateAnApplicationVariables, Context } from '../../types';

// TODO
// TODO: update documentation

/**
 * createAnApplication
 * Create an application helper.
 * 1) Get a country from a provided isoCode.
 * 2) Create a new application with owner relationship.
 * 3) Create eligibility relationship with the country and application.
 * 4) Create buyer relationship with the country and application.
 * 5) Update the application with buyer and eligibility IDs.
 * 6) Updates status and sets submissionType to MIA
 * 7) Returns an application or null
 * @param {Object} GraphQL root variables
 * @param {CreateAnApplicationVariables} GraphQL variables for the CreateAnApplication
 * @param {Context} KeystoneJS context API
 * @returns {Promise<Application>} Created application or null
 */
const createAnApplication = async (root: any, variables: CreateAnApplicationVariables, context: Context) => {
  console.info('Creating an application (createAnApplication helper) for user %s', variables.accountId);

  try {
    const { accountId, eligibilityAnswers, company: companyData, sectionReview: sectionReviewData, status } = variables;

    /**
     * Check that the account exists.
     * If not, return null.
     */
    const account = await getAccountById(context, accountId);

    if (!account) {
      console.info('Rejecting application creation - no account found (createAnApplication helper)');

      return null;
    }

    /**
     * Create the initial application.
     * This needs to be done first so that we can use the application ID.
     */
    const application = await initialApplication.create({
      context,
      accountId,
      status,
    });

    const { id: applicationId } = application;

    // create application relationships
    const { buyerId, companyId, eligibilityId, exportContractId, nominatedLossPayeeId, policyId, sectionReviewId } = await applicationRelationships.create({
      context,
      applicationId,
      companyData,
      eligibilityAnswers,
      sectionReviewData,
    });

    // update the application's relationship column values
    const updatedApplication = await applicationColumns.update({
      context,
      applicationId,
      buyerId,
      companyId,
      eligibilityId,
      exportContractId,
      nominatedLossPayeeId,
      policyId,
      sectionReviewId,
    });

    return updatedApplication;
  } catch (err) {
    console.error(`Error creating an application (createAnApplication helper) for user ${variables.accountId} %O`, err);

    throw new Error(`Creating an application (createAnApplication helper) for user ${variables.accountId} ${err}`);
  }
};

export default createAnApplication;
