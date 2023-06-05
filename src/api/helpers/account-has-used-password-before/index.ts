import { Context } from '.keystone/types'; // eslint-disable-line
import getPasswordHash from '../get-password-hash';

/**
 * hasAccountUsedPasswordBefore
 * Check if an account has used a given password before
 * 1) Get an account's previous hashes
 * 2) Check if the provided password matches any previous password
 * @param {Object} KeystoneJS context API
 * @param {String} Account ID
 * @param {String} New password
 * @returns {Boolean}
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
    console.error(err);

    throw new Error(`Checking if an account has used a password before ${err}`);
  }
};

export default hasAccountUsedPasswordBefore;
