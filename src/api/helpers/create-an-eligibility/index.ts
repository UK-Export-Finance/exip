import { Context } from '../../types';

/**
 * createAnEligibility
 * Create an eligibility with relationships for:
 * 1) A buyer country
 * 2) An application
 * 3) A total contract value
 * @param {Context} context: KeystoneJS context API
 * @param {string} countryId: Country ID
 * @param {string} applicationId: Application ID
 * @param {string} coverPeriodId: Cover period value ID
 * @param {string} totalContractValueId: Total contract value ID
 * @param {object} eligibilityData: Optional eligibility data
 * @returns {Promise<object>} Created eligibility
 */
const createAnEligibility = async (
  context: Context,
  countryId: string,
  applicationId: string,
  coverPeriodId: string,
  totalContractValueId: string,
  eligibilityData?: object,
) => {
  console.info('Creating an eligibility for %s', applicationId);

  try {
    const eligibility = await context.db.Eligibility.createOne({
      data: {
        buyerCountry: {
          connect: { id: countryId },
        },
        application: {
          connect: { id: applicationId },
        },
        coverPeriod: {
          connect: { id: coverPeriodId },
        },
        totalContractValue: {
          connect: { id: totalContractValueId },
        },
        ...eligibilityData,
      },
    });

    return eligibility;
  } catch (error) {
    console.error('Error creating an eligibility %o', error);

    throw new Error(`Creating an eligibility ${error}`);
  }
};

export default createAnEligibility;
