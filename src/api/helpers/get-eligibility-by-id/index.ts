import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * getEligibilityById
 * Get an eligibility by ID
 * @param {Context} context: KeystoneJS context API
 * @param {string} id: Eligibility ID
 * @returns {Promise<ApplicationEligibility>}
 */
const getEligibilityById = async (context: Context, id: string) => {
  try {
    console.info('Getting eligibility by ID %s', id);

    const eligibility = await context.db.Eligibility.findOne({
      where: { id },
    });

    return eligibility;
  } catch (error) {
    console.error('Getting eligibility by ID %s %o', id, error);

    throw new Error(`Error Getting eligibility by ID ${id} ${error}`);
  }
};

export default getEligibilityById;
