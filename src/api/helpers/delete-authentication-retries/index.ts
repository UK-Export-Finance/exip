import { Context } from '../../types';
import getAuthenticationRetriesByAccountId from '../get-authentication-retries-by-account-id';

/**
 * deleteAuthenticationRetries
 * Delete Authentication table entries by account ID
 * @param {Context} context: KeystoneJS context API
 * @param {string} Account ID
 * @returns {Promise<boolean>}
 */
const deleteAuthenticationRetries = async (context: Context, accountId: string) => {
  console.info('Deleting authentication retries for account %s', accountId);

  try {
    const retries = await getAuthenticationRetriesByAccountId(context, accountId);

    const retryIds = retries.map((obj) => ({
      id: obj.id,
    }));

    const result = await context.db.AuthenticationRetry.deleteMany({
      where: retryIds,
    });

    return result;
  } catch (error) {
    console.error('Error deleting authentication retries %o', error);

    throw new Error(`Deleting authentication retries ${error}`);
  }
};

export default deleteAuthenticationRetries;
