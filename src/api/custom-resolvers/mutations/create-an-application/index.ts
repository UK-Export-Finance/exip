import getAccountById from '../../../helpers/get-account-by-id';
import getCountryByField from '../../../helpers/get-country-by-field';
import createAnEligibility from '../../../helpers/create-an-eligibility';
import createABuyer from '../../../helpers/create-a-buyer';
import createAPolicy from '../../../helpers/create-a-policy';
import createACompany from '../../../helpers/create-a-company';
import { CreateAnApplicationVariables, Context } from '../../../types';

/**
 * createAnApplication
 * Create an application.
 * 1) Get a country from a provided isoCode.
 * 2) Create a new application with owner relationship.
 * 3) Create eligibility relationship with the country and application.
 * 4) Create buyer relationship with the country and application.
 * 5) Update the application with buyer and eligibility IDs.
 * @param {Object} GraphQL root variables
 * @param {Object} GraphQL variables for the CreateAnApplication mutation
 * @param {Object} KeystoneJS context API
 * @returns {Object} Object with success flag
 */
const createAnApplication = async (root: any, variables: CreateAnApplicationVariables, context: Context) => {
  console.info('Creating application for ', variables.accountId);

  try {
    const { accountId, eligibilityAnswers, company: companyData } = variables;

    /**
     * Check the account exists.
     * If not, reject.
     */
    const account = await getAccountById(context, accountId);

    if (!account) {
      return {
        success: false,
      };
    }

    /**
     * Get a country's ID from the provided ISO code.
     * This is required to be used in:
     * 1) Eligibility buyer country relationship
     * 2) Buyer country relationship
     */
    const { buyerCountryIsoCode, needPreCreditPeriodCover, ...otherEligibilityAnswers } = eligibilityAnswers;

    const country = await getCountryByField(context, 'isoCode', buyerCountryIsoCode);

    /**
     * Create the initial application.
     * We need to do this first so that we can use the application ID.
     */
    const application = await context.db.Application.createOne({
      data: {
        owner: {
          connect: { id: accountId },
        },
      },
    });

    const { id: applicationId } = application;

    /**
     * 1) Create a new eligibility with country and application relationship.
     * 2) Create a new buyer with country and application relationship.
     * 3) Create a new policy with application relationship.
     */
    const buyer = await createABuyer(context, country.id, applicationId);

    const eligibility = await createAnEligibility(context, country.id, applicationId, otherEligibilityAnswers);

    const policy = await createAPolicy(context, applicationId);

    const company = await createACompany(context, applicationId, companyData);

    /**
     * Update the application with relationships for:
     * 1) Buyer
     * 2) Eligibility
     * 3) Policy
     */
    const updatedApplication = await context.db.Application.updateOne({
      where: {
        id: applicationId,
      },
      data: {
        buyer: {
          connect: { id: buyer.id },
        },
        eligibility: {
          connect: { id: eligibility.id },
        },
        policy: {
          connect: { id: policy.id },
        },
        company: {
          connect: { id: company.id },
        },
      },
    });

    return {
      ...updatedApplication,
      success: true,
    };
  } catch (err) {
    console.error('Error creating application %O', err);

    throw new Error(`Creating application ${err}`);
  }
};

export default createAnApplication;
