import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * create buyer test helper
 * Create a buyer with mock buyer data and any provied custom buyer data.
 * @param {Context} context: KeystoneJS context API, buyer data
 * @param {ApplicationBuyer} data
 * @returns {Object} Created buyer
 */
const create = async (context: Context, data = {}) => {
  try {
    console.info('Creating a buyer (test helpers)');

    const buyer = await context.db.Buyer.createOne({
      data,
    });

    return buyer;
  } catch (error) {
    console.error(error);

    return error;
  }
};

/**
 * getAll test helper
 * Get all buyers
 * @param {Context} context: KeystoneJS context API
 * @returns {Array} All buyers
 */
const getAll = async (context: Context) => {
  try {
    console.info('Getting all buyers (test helpers)');

    const buyers = await context.query.Buyer.findMany();

    return buyers;
  } catch (error) {
    console.error(error);

    throw new Error(`Getting all buyers (test helpers) ${error}`);
  }
};

/**
 * deleteAll test helper
 * Get all buyers and delete them.
 * @param {Context} context: KeystoneJS context API
 * @returns {Array} Buyers that have been deleted
 */
const deleteAll = async (context: Context) => {
  try {
    console.info('Getting and deleting all buyers (test helpers)');

    const buyers = await context.query.Buyer.findMany();

    if (buyers.length) {
      const response = await context.query.Buyer.deleteMany({
        where: buyers,
      });

      return response;
    }

    return [];
  } catch (error) {
    console.error(error);

    throw new Error(`Getting and deleting all buyers (test helpers) ${error}`);
  }
};

const buyer = {
  create,
  getAll,
  deleteAll,
};

export default buyer;
