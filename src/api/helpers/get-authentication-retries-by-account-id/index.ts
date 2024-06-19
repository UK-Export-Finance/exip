import { Context } from '.keystone/types';

/**
 * getAuthenticationRetriesByAccountId
 * Get Authentication retry table entries by account ID
 * @param {Context} KeystoneJS context API
 * @param {String} Account ID
 * @returns {Promise<Boolean>}
 */
const getAuthenticationRetriesByAccountId = async (context: Context, accountId: string) => {
  console.info('Getting authentication retries by account ID');

  try {
    const retries = await context.db.AuthenticationRetry.findMany({
      where: {
        account: {
          every: {
            id: { equals: accountId },
          },
        },
      },
    });

    return retries;
  } catch (err) {
    console.error('Error getting authentication retries by account ID %O', err);

    throw new Error(`Getting authentication retries by account ID ${err}`);
  }
};

export default getAuthenticationRetriesByAccountId;
