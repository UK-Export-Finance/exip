import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * getAll test helper
 * Get all reference numbers
 * @param {Context} context: KeystoneJS context API
 * @returns {Array} All reference numbers
 */
const getAll = async (context: Context) => {
  try {
    console.info('Getting all reference numbers (test helpers)');

    const buyers = await context.db.ReferenceNumber.findMany();

    return buyers;
  } catch (error) {
    console.error('Error getting all reference numbers (test helpers)');

    throw new Error(`Getting all reference numbers (test helpers) ${error}`);
  }
};

/**
 * deleteAll test helper
 * Get all reference numbers and delete them.
 * @param {Context} context: KeystoneJS context API
 * @returns {Array} Reference numbers that have been deleted
 */
const deleteAll = async (context: Context) => {
  try {
    console.info('Getting and deleting all reference numbers (test helpers)');

    const referenceNumbers = await context.query.ReferenceNumber.findMany();

    if (referenceNumbers.length) {
      const response = await context.query.ReferenceNumber.deleteMany({
        where: referenceNumbers,
      });

      return response;
    }

    return [];
  } catch (error) {
    console.error('Error getting and deleting all reference numbers (test helpers)');

    throw new Error(`Getting and deleting all reference numbers (test helpers) ${error}`);
  }
};

const buyer = {
  getAll,
  deleteAll,
};

export default buyer;
