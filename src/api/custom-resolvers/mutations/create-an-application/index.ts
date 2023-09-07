import getAccountById from '../../../helpers/get-account-by-id';
import getCountryByField from '../../../helpers/get-country-by-field';
import { CreateAnApplicationVariables, Context } from '../../../types';

/**
 * createAnApplication
 * Create an application.
 * 1) Get a country from a provided isoCode.
 * 2) Create a new application with owner relationship.
 * 3) Create eligibility relationship with the country and application.
 * 4) Create buyer relationship with the country and application.
 * 5) Update the application with buyer and eligibility ID.s
 * @param {Object} GraphQL root variables
 * @param {Object} GraphQL variables for the CreateAnApplication mutation
 * @param {Object} KeystoneJS context API
 * @returns {Object} Object with success flag
 */
const createAnApplication = async (root: any, variables: CreateAnApplicationVariables, context: Context) => {
  console.info('Creating application for ', variables.accountId);

  try {
    const { accountId, eligibilityAnswers } = variables;

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
    const { buyerCountryIsoCode, ...otherEligibilityAnswers } = eligibilityAnswers;

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

    /**
     * Create eligibility and relationships for:
     * 1) The buyer country
     * 2) The application
     */
    const eligibility = await context.db.Eligibility.createOne({
      data: {
        ...otherEligibilityAnswers,
        buyerCountry: {
          connect: { id: country.id },
        },
        application: {
          connect: { id: application.id },
        },
      },
    });

    /**
     * Create buyer and relationships for:
     * 1) The country
     * 2) The application
     */
    const buyer = await context.db.Buyer.createOne({
      data: {
        country: {
          connect: { id: country.id },
        },
        application: {
          connect: { id: application.id },
        },
      },
    });

    /**
     * Update the application with relationships for:
     * 1) Buyer
     * 2) Eligibility
     */
    const updatedApplication = await context.db.Application.updateOne({
      where: {
        id: application.id,
      },
      data: {
        buyer: {
          connect: { id: buyer.id },
        },
        eligibility: {
          connect: { id: eligibility.id },
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
