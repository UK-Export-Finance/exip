import getPasswordHash from '../get-password-hash';
import { Context } from '../../types';

/**
 * hasAccountUsedPasswordBefore
 * Check if an account has used a given password before
 * 1) Get an account's previous hashes
 * 2) Check if the provided password matches any previous password
 * @param {Object} KeystoneJS context API
 * @param {String} Account ID
 * @param {String} New password
 * @returns {Promise<Boolean>}
 */
const hasAccountUsedPasswordBefore = async (context: Context, accountId: string, newPassword: string) => {
  console.info('Checking if an account has used a password before');

  try {
    let usedBefore = false;

    const previousHashes = await context.db.Authentication.findMany({
      where: {
        account: {
          every: {
            id: { equals: accountId },
          },
        },
      },
    });

    if (previousHashes.length) {
      previousHashes.forEach((previous) => {
        const newHashPreviousSalt = getPasswordHash(newPassword, previous.salt);

        if (newHashPreviousSalt === previous.hash) {
          usedBefore = true;
        }
      });
    }

    return usedBefore;
  } catch (err) {
    console.error('Error checking if an account has used a password before %O', err);

    throw new Error(`Checking if an account has used a password before ${err}`);
  }
};

export default hasAccountUsedPasswordBefore;
