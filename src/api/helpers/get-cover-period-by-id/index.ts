import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * getCoverPeriodById
 * Get a cover period by ID
 * @param {Context} context: KeystoneJS context API
 * @param {string} id: CoverPeriod ID
 * @returns {Promise<CoverPeriod>}
 */
const getCoverPeriodById = async (context: Context, id: string) => {
  try {
    console.info('Getting coverPeriod by ID %s', id);

    const coverPeriod = await context.db.CoverPeriod.findOne({
      where: { id },
    });

    return coverPeriod;
  } catch (error) {
    console.error('Getting coverPeriod by ID %s %o', id, error);

    throw new Error(`Error Getting coverPeriod by ID ${id} ${error}`);
  }
};

export default getCoverPeriodById;
