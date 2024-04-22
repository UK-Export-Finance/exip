import { isAfter, isBefore } from 'date-fns';
import { ACCOUNT } from '../../constants';
import getAuthenticationRetriesByAccountId from '../get-authentication-retries-by-account-id';
import { Context } from '../../types';

const { MAX_AUTH_RETRIES, MAX_AUTH_RETRIES_TIMEFRAME } = ACCOUNT;

/**
 * shouldBlockAccount
 * Check an accounts authentication retries
 * If there are total of MAX_AUTH_RETRIES in less than MAX_AUTH_RETRIES_TIMEFRAME,
 * Return a flag indicating that the account should be blocked.
 * @param {Object} KeystoneJS context API
 * @param {String} Account ID
 * @returns {Promise<Boolean>}
 */
const shouldBlockAccount = async (context: Context, accountId: string): Promise<boolean> => {
  console.info('Checking account authentication retries %s', accountId);

  try {
    /**
     * Get retries associated with the provided account ID
     */
    const retries = await getAuthenticationRetriesByAccountId(context, accountId);

    const now = new Date();

    /**
     * Get retries that are within 24 hours:
     * 1) Retry date is after 24 hours from now (MAX_AUTH_RETRIES_TIMEFRAME)
     * 2) Retry date is before the current time
     */
    const retriesInTimeframe = [] as Array<string>;

    retries.forEach((retry) => {
      const retryDate = retry.createdAt;

      const isWithinLast24Hours = isAfter(retryDate, MAX_AUTH_RETRIES_TIMEFRAME) && isBefore(retryDate, now);

      if (isWithinLast24Hours) {
        retriesInTimeframe.push(retry.id);
      }
    });

    /**
     * Check if the retries breach the threshold:
     * - total of MAX_AUTH_RETRIES in less than MAX_AUTH_RETRIES_TIMEFRAME
     */
    if (retriesInTimeframe.length >= MAX_AUTH_RETRIES) {
      console.info('Account authentication retries exceeds the threshold %s', accountId);

      return true;
    }

    return false;
  } catch (err) {
    console.error('Error checking account authentication retries %O', err);

    throw new Error(`Checking account authentication retries  ${err}`);
  }
};

export default shouldBlockAccount;
