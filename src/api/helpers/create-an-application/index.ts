import getAccountById from '../get-account-by-id';
import initialApplication from './create-initial-application';
import applicationRelationships from './create-application-relationships';
import applicationColumns from './update-application-columns';
import { CreateAnApplicationVariables, Context } from '../../types';

/**
 * createAnApplicationHelper
 * Create an application helper.
 * 1) Get an account by ID.
 * 2) Create the initial application.
 * 3) Create application relationships.
 * 4) Update the application's relationship columns.
 * @param {CreateAnApplicationVariables} variables: GraphQL variables for the CreateAnApplication
 * @param {Context} context: KeystoneJS context API
 * @returns {Promise<Application>} Created application
 */
const createAnApplicationHelper = async (variables: CreateAnApplicationVariables, context: Context) => {
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
    const {
      brokerId,
      businessId,
      buyerId,
      companyId,
      declarationId,
      eligibilityId,
      exportContractId,
      nominatedLossPayeeId,
      policyId,
      policyContactId,
      referenceNumber,
      sectionReviewId,
    } = await applicationRelationships.create({
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
      brokerId,
      businessId,
      buyerId,
      companyId,
      declarationId,
      eligibilityId,
      exportContractId,
      nominatedLossPayeeId,
      policyId,
      policyContactId,
      referenceNumber,
      sectionReviewId,
    });

    return updatedApplication;
  } catch (err) {
    console.error(`Error creating an application (createAnApplication helper) for user ${variables.accountId} %O`, err);

    throw new Error(`Creating an application (createAnApplication helper) for user ${variables.accountId} ${err}`);
  }
};

export default createAnApplicationHelper;
