import { Context } from '.keystone/types';

/**
 * createAnEligibility
 * Create an eligibility with relationships for:
 * 1) A buyer country
 * 2) An application
 * 3) A total contract value
 * @param {Context} KeystoneJS context API
 * @param {String} Country ID
 * @param {String} Application ID
 * @param {String} Cover period value ID
 * @param {String} Total contract value ID
 * @param {Object} Optional eligibility data
 * @returns {Promise<Object>} Created eligibility
 */
const createAnEligibility = async (
  context: Context,
  countryId: string,
  applicationId: string,
  coverPeriodId: string,
  totalContractValueId: string,
  data?: object,
) => {
  console.info('Creating an eligibility for ', applicationId);

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
        ...data,
      },
    });

    return eligibility;
  } catch (err) {
    console.error('Error creating an eligibility %O', err);

    throw new Error(`Creating an eligibility ${err}`);
  }
};

export default createAnEligibility;
