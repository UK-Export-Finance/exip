import { Context } from '../types';

/**
 * findAll test helper
 * Get all auth retries and delete them.
 * @param {Context} context: KeystoneJS context API
 * @returns {Array} Auth retries
 */
const findAll = async (context: Context) => {
  try {
    console.info('Getting auth retries (test helpers)');

    const retries = await context.query.AuthenticationRetry.findMany();

    return retries;
  } catch (error) {
    console.error('Error getting auth retries (test helpers) %o', error);

    throw new Error(`Getting auth retries (test helpers) ${error}`);
  }
};

/**
 * deleteAll test helper
 * Delete all auth retries
 * @param {Context} context: KeystoneJS context API
 * @returns {Array} Deleted auth retries
 */
const deleteAll = async (context: Context) => {
  try {
    console.info('Deleting auth retries (test helpers)');

    const retries = await findAll(context);

    const deleted = await context.query.AuthenticationRetry.deleteMany({
      where: retries,
    });

    return deleted;
  } catch (error) {
    console.error('Error deleting auth retries (test helpers) %o', error);

    return error;
  }
};

const authRetries = {
  findAll,
  deleteAll,
};

export default authRetries;
