import { Context } from '../../types';

/**
 * createAuthenticationEntry
 * Create an entry in the Authentication table
 * @param {Context} KeystoneJS context API
 * @param {String} Account ID
 * @returns {Promise<Boolean>}
 */
const createAuthenticationEntry = async (context: Context, entry: object) => {
  console.info('Creating authentication entry');

  try {
    const result = await context.db.Authentication.createOne({
      data: {
        ...entry,
        createdAt: new Date(),
      },
    });

    return result;
  } catch (err) {
    console.error('Error creating authentication entry %O', err);

    throw new Error(`Creating authentication entry ${err}`);
  }
};

export default createAuthenticationEntry;
