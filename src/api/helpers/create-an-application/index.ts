import getAccountById from '../get-account-by-id';
import initialApplication from './create-initial-application';
import applicationRelationships from './create-application-relationships';
import applicationColumns from './update-application-columns';
import { CreateAnApplicationVariables, Context } from '../../types';

/**
 * createAnApplication
 * Create an application helper.
 * 1) Get an account by ID.
 * 2) Create the initial application.
 * 3) Create application relationships.
 * 4) Update the application's relationship columns.
 * @param {Object} GraphQL root variables
 * @param {CreateAnApplicationVariables} GraphQL variables for the CreateAnApplication
 * @param {Context} KeystoneJS context API
 * @returns {Promise<Application>} Created application
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
    const { buyerId, declarationId, companyId, eligibilityId, exportContractId, nominatedLossPayeeId, policyId, sectionReviewId } =
      await applicationRelationships.create({
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
      declarationId,
      eligibilityId,
      exportContractId,
      nominatedLossPayeeId,
      policyId,
      sectionReviewId,
    });

    return updatedApplication;
  } catch (error) {
    console.error('Error creating an application (createAnApplication helper) for user %s %O', variables.accountId, error);

    throw new Error(`Creating an application (createAnApplication helper) for user ${variables.accountId} ${error}`);
  }
};

export default createAnApplication;
