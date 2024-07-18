import { Context } from '.keystone/types'; // eslint-disable-line
import { ApplicationEligibility } from '../types/application-types';

/**
 * create eligibility test helper
 * Create an eligibility with mock data
 * @param {Context} context: KeystoneJS context API
 * @returns {Promise<ApplicationEligibility>} Eligibility
 */
const create = async (context: Context) => {
  try {
    console.info('Creating an eligibility (test helpers)');

    const eligibility = (await context.query.Eligibility.createOne({
      data: {},
      query:
        'id hasEndBuyer hasMinimumUkGoodsOrServices hasCompaniesHouseNumber otherPartiesInvolved paidByLetterOfCredit validExporterLocation',
    })) as ApplicationEligibility;

    return eligibility;
  } catch (err) {
    console.error(err);
    return err;
  }
};

/**
 * get eligibility test helper
 * Get an eligibility by ID
 * @param {Context} context: KeystoneJS context API
 * @param {String} eligibilityId: Eligibility ID
 * @returns {Promise<ApplicationEligibility>} Eligibility
 */
const get = async (context: Context, eligibilityId: string): Promise<ApplicationEligibility> => {
  try {
    console.info('Getting an eligibility by ID (test helpers)');

    const eligibility = (await context.query.Eligibility.findOne({
      where: { id: eligibilityId },
      query:
        'id hasEndBuyer hasMinimumUkGoodsOrServices hasCompaniesHouseNumber otherPartiesInvolved paidByLetterOfCredit validExporterLocation',
    })) as ApplicationEligibility;

    return eligibility;
  } catch (err) {
    console.error(err);
    throw new Error(`Getting an eligibility by ID (test helpers) ${err}`);
  }
};

const eligibility = {
  create,
  get,
};

export default eligibility;
