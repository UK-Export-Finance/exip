import { Context } from '.keystone/types';
import getAccountById from '../get-account-by-id';
import getCountryByField from '../get-country-by-field';
import getCreditPeriodValueByField from '../get-cover-period-value-by-field';
import getTotalContractValueByField from '../get-total-contract-value-by-field';
import createAnEligibility from '../create-an-eligibility';
import createABuyer from '../create-a-buyer';
import createAPolicy from '../create-a-policy';
import createANominatedLossPayee from '../create-a-nominated-loss-payee';
import createACompany from '../create-a-company';
import createAnExportContract from '../create-an-export-contract';
import createASectionReview from '../create-a-section-review';
import { APPLICATION } from '../../constants';
import { ApplicationBuyer, CreateAnApplicationVariables } from '../../types';

const { SUBMISSION_TYPE } = APPLICATION;

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
  console.info('Creating an application (createAnApplication helper)');

  try {
    const { accountId, eligibilityAnswers, company: companyData, sectionReview: sectionReviewData, status } = variables;

    /**
     * Check the account exists.
     * If not, return null.
     */
    const account = await getAccountById(context, accountId);

    if (!account) {
      return null;
    }

    /**
     * Get a country's ID from the provided ISO code.
     * This is required to be used in:
     * 1) Eligibility buyer country relationship
     * 2) Buyer country relationship
     */
    const { buyerCountryIsoCode, totalContractValueId, coverPeriodId, ...otherEligibilityAnswers } = eligibilityAnswers;

    const country = await getCountryByField(context, 'isoCode', buyerCountryIsoCode);

    // add default submission type
    const submissionType = SUBMISSION_TYPE.MIA;

    /**
     * Create the initial application.
     * We need to do this first so that we can use the application ID.
     */
    const application = await context.db.Application.createOne({
      data: {
        owner: {
          connect: { id: accountId },
        },
        status,
        submissionType,
      },
    });

    const { id: applicationId } = application;

    /**
     * 1) Create a new buyer with country and application relationship.
     * 2) Get a totalContractValue DB entry, for linking a relationship to eligibility.
     * 3) Create a cover period value from the DB.
     * 4) Create a new eligibility with country and application relationship.
     * 5) Create a new export contract with application relationship.
     * 6) Create a new policy with application relationship.
     * 7) Create a new nominated loss payee with application relationship.
     * 8) Create a new company with application relationship.
     * 9) Create a new sectionReview with application relationship
     */

    // @ts-ignore
    const { buyer } = await createABuyer(context, country.id, applicationId);

    const totalContractValue = await getTotalContractValueByField(context, 'valueId', totalContractValueId);

    const coverPeriod = await getCreditPeriodValueByField(context, 'valueId', coverPeriodId);

    // @ts-ignore
    const eligibility = await createAnEligibility(context, country.id, applicationId, coverPeriod.id, totalContractValue.id, otherEligibilityAnswers);

    const { exportContract } = await createAnExportContract(context, applicationId);

    // @ts-ignore
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

    return updatedApplication;
  } catch (err) {
    console.error('Error creating an application (createAnApplication helper) %O', err);

    throw new Error(`Creating an application (createAnApplication helper) ${err}`);
  }
};

export default createAnApplication;
