import { Context } from '.keystone/types'; // eslint-disable-line
import { isWithinInterval } from 'date-fns';
import { ACCOUNT } from '../../constants';

const { MAX_PASSWORD_RESET_TRIES, MAX_PASSWORD_RESET_TRIES_TIMEFRAME } = ACCOUNT;

/**
 * shouldBlockAccount
 * Check an accounts authentication retries
 * If there are total of MAX_PASSWORD_RESET_TRIES in less than MAX_PASSWORD_RESET_TRIES_TIMEFRAME,
 * Return a flag indicating that the account should be blocked.
 * @param {Object} KeystoneJS context API
 * @param {String} Account ID
 * @returns {Boolean}
 */
const shouldBlockAccount = async (context: Context, accountId: string): Promise<boolean> => {
  console.info(`Checking account ${accountId} password reset retries`);

  /**
   * Get retries associated with the provided account ID
   */
  const retries = await context.db.AuthenticationRetry.findMany({
    where: {
      account: {
        every: {
          id: { equals: accountId },
        },
      },
    },
  });

  const now = new Date();

  /**
   * Check if the retries breach the threshold:
   * - total of MAX_PASSWORD_RESET_TRIES in less than MAX_PASSWORD_RESET_TRIES_TIMEFRAME
   */
  const retriesInTimeframe = [] as Array<string>;

  retries.forEach((retry) => {
    const retryDate = new Date(retry.createdAt);

    const isWithinLast24Hours = isWithinInterval(retryDate, {
      start: MAX_PASSWORD_RESET_TRIES_TIMEFRAME,
      end: now,
    });

    if (isWithinLast24Hours) {
      retriesInTimeframe.push(retry.id);
    }
  });

  if (retriesInTimeframe.length >= MAX_PASSWORD_RESET_TRIES) {
    console.info(`Account ${accountId} password reset retries exceeds the threshold`);

    return true;
  }

  return false;
};

export default shouldBlockAccount;
