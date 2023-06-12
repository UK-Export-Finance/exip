import { Context } from '.keystone/types'; // eslint-disable-line
import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import baseConfig from '../../keystone';
import shouldBlockAccount from '.';
import createAuthenticationRetryEntry from '../create-authentication-retry-entry';
import { ACCOUNT } from '../../constants';
import { mockAccount } from '../../test-mocks';
import { Account, ApplicationRelationship } from '../../types';

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

dotenv.config();

const context = getContext(config, PrismaModule) as Context;

const { MAX_PASSWORD_RESET_TRIES, MAX_PASSWORD_RESET_TRIES_TIMEFRAME } = ACCOUNT;

describe('helpers/should-block-account', () => {
  let account: Account;
  let retries: Array<ApplicationRelationship>;

  beforeEach(async () => {
    // wipe the accounts table so we have a clean slate.
    const accounts = await context.query.Account.findMany();

    await context.query.Account.deleteMany({
      where: accounts,
    });

    // create an account
    account = (await context.query.Account.createOne({
      data: mockAccount,
      query: 'id',
    })) as Account;
  });

  describe(`when the account has ${MAX_PASSWORD_RESET_TRIES} entries in the AuthenticationRetry table that are within MAX_PASSWORD_RESET_TRIES_TIMEFRAME`, () => {
    beforeEach(async () => {
      // wipe the AuthenticationRetry table so we have a clean slate.
      retries = (await context.query.AuthenticationRetry.findMany()) as Array<ApplicationRelationship>;

      await context.query.AuthenticationRetry.deleteMany({
        where: retries,
      });

      // generate an array of promises to create retry entries
      const entriesToCreate = [...Array(MAX_PASSWORD_RESET_TRIES)].map(async () => createAuthenticationRetryEntry(context, account.id));

      await Promise.all(entriesToCreate);

      retries = (await context.query.AuthenticationRetry.findMany()) as Array<ApplicationRelationship>;
    });

    it('should return true', async () => {
      const result = await shouldBlockAccount(context, account.id);

      expect(result).toEqual(true);
    });
  });

  describe(`when the account does NOT have ${MAX_PASSWORD_RESET_TRIES} entries in the AuthenticationRetry table`, () => {
    beforeEach(async () => {
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

  describe(`when the account has ${MAX_PASSWORD_RESET_TRIES} entries in the AuthenticationRetry table that are outside of the timeframe`, () => {
    beforeEach(async () => {
      // wipe the AuthenticationRetry table so we have a clean slate.
      retries = (await context.query.AuthenticationRetry.findMany()) as Array<ApplicationRelationship>;

      await context.query.AuthenticationRetry.deleteMany({
        where: retries,
      });

      const timeframe = new Date(MAX_PASSWORD_RESET_TRIES_TIMEFRAME);

      const currentHours = timeframe.getHours();

      const oneHourOutsideOfTimeframe = new Date(timeframe.setHours(currentHours - 1));

      const currentDay = timeframe.getDate();
      const oneDayOutsideOfTimeframe = new Date(oneHourOutsideOfTimeframe.setDate(currentDay - 1));

      const retryEntries = Array(MAX_PASSWORD_RESET_TRIES).fill({
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
