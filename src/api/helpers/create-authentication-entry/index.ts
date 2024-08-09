import { Context } from '../../types';

/**
 * createAuthenticationEntry
 * Create an entry in the Authentication table
 * @param {Context} context: KeystoneJS context API
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
  } catch (error) {
    console.error('Error creating authentication entry %O', error);

    throw new Error(`Creating authentication entry ${error}`);
  }
};

export default createAuthenticationEntry;
