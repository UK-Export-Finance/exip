import shouldBlockAccount from '.';
import createAuthenticationRetryEntry from '../create-authentication-retry-entry';
import { ACCOUNT } from '../../constants';
import accounts from '../../test-helpers/accounts';
import authRetries from '../../test-helpers/auth-retries';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import { Account, Context } from '../../types';

const { MAX_AUTH_RETRIES, MAX_AUTH_RETRIES_TIMEFRAME } = ACCOUNT;

describe('helpers/should-block-account', () => {
  let context: Context;
  let account: Account;

  beforeAll(async () => {
    context = getKeystoneContext();

    await accounts.deleteAll(context);

    account = await accounts.create({ context });
  });

  describe(`when the account has ${MAX_AUTH_RETRIES} entries in the AuthenticationRetry table that are within MAX_AUTH_RETRIES_TIMEFRAME`, () => {
    beforeEach(async () => {
      // wipe the AuthenticationRetry table so we have a clean slate.
      await authRetries.deleteAll(context);

      // generate an array of promises to create retry entries
      const entriesToCreate = [...Array(MAX_AUTH_RETRIES)].map(async () => createAuthenticationRetryEntry(context, account.id));

      await Promise.all(entriesToCreate);
    });

    it('should return true', async () => {
      const result = await shouldBlockAccount(context, account.id);

      expect(result).toEqual(true);
    });
  });

  describe(`when the account does NOT have ${MAX_AUTH_RETRIES} entries in the AuthenticationRetry table`, () => {
    beforeEach(async () => {
      const retries = await authRetries.findAll(context);

      // delete the last retry entry
      const lastRetry = retries[retries.length - 1];

      await context.query.AuthenticationRetry.deleteOne({
        where: {
          id: lastRetry.id,
        },
      });
    });

    it('should return false', async () => {
      const result = await shouldBlockAccount(context, account.id);

      expect(result).toEqual(false);
    });
  });

  describe(`when the account has ${MAX_AUTH_RETRIES} entries in the AuthenticationRetry table that are outside of the timeframe`, () => {
    beforeEach(async () => {
      // wipe the AuthenticationRetry table so we have a clean slate.
      await authRetries.deleteAll(context);

      const timeframe = new Date(MAX_AUTH_RETRIES_TIMEFRAME);

      const currentHours = timeframe.getHours();

      const oneHourOutsideOfTimeframe = new Date(timeframe.setHours(currentHours - 1));

      const currentDay = timeframe.getDate();
      const oneDayOutsideOfTimeframe = new Date(oneHourOutsideOfTimeframe.setDate(currentDay - 1));

      const retryEntries = Array(MAX_AUTH_RETRIES).fill({
        createdAt: oneDayOutsideOfTimeframe,
      });

      await context.query.AuthenticationRetry.createMany({
        data: retryEntries,
      });
    });

    it('should return false', async () => {
      const result = await shouldBlockAccount(context, account.id);

      expect(result).toEqual(false);
    });
  });
});
