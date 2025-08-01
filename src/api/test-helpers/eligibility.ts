import { Context } from '.keystone/types'; // eslint-disable-line
import { ApplicationEligibility } from '../types/application-types';

/**
 * create eligibility test helper
 * Create an eligibility with mock data
 * @param {Context} context: KeystoneJS context API
 * @param {ApplicationEligibility} data
 * @returns {Promise<ApplicationEligibility>} Eligibility
 */
const create = async (context: Context, data = {}) => {
  try {
    console.info('Creating an eligibility (test helpers)');

    const eligibility = (await context.query.Eligibility.createOne({
      data,
      query: 'id hasEndBuyer hasMinimumUkGoodsOrServices hasCompaniesHouseNumber otherPartiesInvolved paidByLetterOfCredit validExporterLocation',
    })) as ApplicationEligibility;

    return eligibility;
  } catch (error) {
    console.error('Error creating an eligibility (test helpers) %o', error);

    return error;
  }
};

/**
 * get eligibility test helper
 * Get an eligibility by ID
 * @param {Context} context: KeystoneJS context API
 * @param {string} eligibilityId: Eligibility ID
 * @returns {Promise<ApplicationEligibility>} Eligibility
 */
const get = async (context: Context, eligibilityId: string): Promise<ApplicationEligibility> => {
  try {
    console.info('Getting an eligibility by ID (test helpers)');

    const eligibility = (await context.query.Eligibility.findOne({
      where: { id: eligibilityId },
      query: 'id hasEndBuyer hasMinimumUkGoodsOrServices hasCompaniesHouseNumber otherPartiesInvolved paidByLetterOfCredit validExporterLocation',
    })) as ApplicationEligibility;

    return eligibility;
  } catch (error) {
    console.error('Error getting an eligibility by ID (test helpers) %o', error);

    throw new Error(`Getting an eligibility by ID (test helpers) ${error}`);
  }
};

const eligibility = {
  create,
  get,
};

export default eligibility;
