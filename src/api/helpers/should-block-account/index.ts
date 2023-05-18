import { Context } from '.keystone/types'; // eslint-disable-line
import { isWithinInterval } from 'date-fns';
import { ACCOUNT } from '../../constants';

const { MAX_PASSWORD_RESET_TRIES } = ACCOUNT;

/**
 * shouldBlockAccount
 * Check an accounts authentication retries
 * If there are total of MAX_PASSWORD_RESET_TRIES in less than 24 hours,
 * Return a flag indicating that the account should be blocked.
 * @param {Object} KeystoneJS context API
 * @param {String} Account ID
 * @returns {Boolean}
 */
const shouldBlockAccount = async (context: Context, accountId: string): Promise<boolean> => {
  console.info(`Checking account ${accountId} for password reset retries`);

  const retries = await context.db.AuthenticationRetry.findMany({
    where: {
      account: {
        every: {
          id: { equals: accountId },
        },
      },
    },
  });

  const now = Date.now();

  const yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);

  const retriesInLast24Hours = [] as Array<string>;

  retries.forEach((retry) => {
    const retryDate = new Date(retry.createdAt);

    const isWithinLast24Hours = isWithinInterval(retryDate, {
      start: yesterday,
      end: now,
    });

    if (isWithinLast24Hours) {
      retriesInLast24Hours.push(retry.id);
    }
  });

  if (retriesInLast24Hours.length >= MAX_PASSWORD_RESET_TRIES) {
    console.info(`Account ${accountId} password reset retries exceeds the threshold`);

    return true;
  }

  return false;
};

export default shouldBlockAccount;
