import getAccountById from '../../../helpers/get-account-by-id';
import getCountryByField from '../../../helpers/get-country-by-field';
import getCreditPeriodValueByField from '../../../helpers/get-cover-period-value-by-field';
import getTotalContractValueByField from '../../../helpers/get-total-contract-value-by-field';
import createAnEligibility from '../../../helpers/create-an-eligibility';
import createABuyer from '../../../helpers/create-a-buyer';
import createAPolicy from '../../../helpers/create-a-policy';
import createANominatedLossPayee from '../../../helpers/create-a-nominated-loss-payee';
import createACompany from '../../../helpers/create-a-company';
import createAnExportContract from '../../../helpers/create-an-export-contract';
import createASectionReview from '../../../helpers/create-a-section-review';
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
    const { accountId, eligibilityAnswers, company: companyData, sectionReview: sectionReviewData } = variables;

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
    const { buyerCountryIsoCode, needPreCreditPeriodCover, totalContractValueId, coverPeriodId, ...otherEligibilityAnswers } = eligibilityAnswers;

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
     * 1) Create a new buyer with country and application relationship.
     * 2) Get a totalContractValue DB entry, for linking a relationship to eligibility.
     * 3) Create a new eligibility with country and application relationship.
     * 4) Create a new policy with application relationship.
     * 5) Create a new sectionReview with application relationship
     */
    const { buyer } = await createABuyer(context, country.id, applicationId);

    const totalContractValue = await getTotalContractValueByField(context, 'valueId', totalContractValueId);

    const coverPeriod = await getCreditPeriodValueByField(context, 'valueId', coverPeriodId);

    const eligibility = await createAnEligibility(context, country.id, applicationId, coverPeriod.id, totalContractValue.id, otherEligibilityAnswers);

    const { exportContract } = await createAnExportContract(context, applicationId);

    const { policy } = await createAPolicy(context, applicationId);

    const nominatedLossPayee = await createANominatedLossPayee(context, applicationId);

    const company = await createACompany(context, applicationId, companyData);

    const sectionReview = await createASectionReview(context, applicationId, sectionReviewData);

    /**
     * Update the application with relationships for:
     * 1) Buyer
     * 2) Company
     * 3) Eligibility
     * 4) Export contract
     * 5) Nominated loss payee
     * 6) Policy
     * 7) Section review
     */
    const updatedApplication = await context.db.Application.updateOne({
      where: {
        id: applicationId,
      },
      data: {
        buyer: {
          connect: { id: buyer.id },
        },
        company: {
          connect: { id: company.id },
        },
        eligibility: {
          connect: { id: eligibility.id },
        },
        exportContract: {
          connect: { id: exportContract.id },
        },
        nominatedLossPayee: {
          connect: { id: nominatedLossPayee.id },
        },
        policy: {
          connect: { id: policy.id },
        },
        sectionReview: {
          connect: { id: sectionReview.id },
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
