import { Context } from '../../types';

/**
 * createAuthenticationRetryEntry
 * Create a new entry in the AuthenticationRetry table
 * @param {Context} context: KeystoneJS context API
 * @param {String} Account ID
 * @returns {Promise<Object>} Object with success flag
 */
const createAuthenticationRetryEntry = async (context: Context, accountId: string) => {
  try {
    console.info('Creating account authentication retry entry');

    const now = new Date();

    const response = await context.db.AuthenticationRetry.createOne({
      data: {
        account: {
          connect: {
            id: accountId,
          },
        },
        createdAt: now,
      },
    });

    if (response.id) {
      return {
        success: true,
      };
    }

    return {
      success: false,
    };
  } catch (error) {
    console.error('Error creating account authentication retry entry %O', error);

    throw new Error(`${error}`);
  }
};

export default createAuthenticationRetryEntry;
