import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * getCoverPeriodById
 * Get a cover period by ID
 * @param {Context} context: KeystoneJS context API
 * @param {String} id: CoverPeriod ID
 * @returns {Promise<CoverPeriod>}
 */
const getCoverPeriodById = async (context: Context, id: string) => {
  try {
    console.info(`Getting coverPeriod by ID ${id}`);

    const coverPeriod = await context.db.CoverPeriod.findOne({
      where: { id },
    });

    return coverPeriod;
  } catch (err) {
    console.error(`Getting coverPeriod by ID ${id} %O`, err);

    throw new Error(`Error Getting coverPeriod by ID ${id} ${err}`);
  }
};

export default getCoverPeriodById;