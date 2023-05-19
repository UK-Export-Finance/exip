import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import createAuthenticationRetryEntry from '.';
import baseConfig from '../../keystone';
import { mockAccount } from '../../test-mocks';
import { Account } from '../../types';
import { Context } from '.keystone/types'; // eslint-disable-line

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

dotenv.config();

const context = getContext(config, PrismaModule) as Context;

describe('helpers/create-authentication-retry-entry', () => {
  let account: Account;

  beforeAll(async () => {
    // create a new account
    account = (await context.query.Account.createOne({
      data: mockAccount,
      query: 'id',
    })) as Account;

    // wipe the AuthenticationRetry table so we have a clean slate.
    const retries = await context.query.AuthenticationRetry.findMany();

    await context.query.AuthenticationRetry.deleteMany({
      where: retries,
    });
  });

  afterAll(async () => {
    const retries = await context.query.AuthenticationRetry.findMany();

    await context.query.AuthenticationRetry.deleteMany({
      where: retries,
    });
  });

  it('should create a new AuthenticationRetry entry associated with the provided account ID', async () => {
    await createAuthenticationRetryEntry(context, account.id);

    const entries = await context.db.AuthenticationRetry.findMany({
      where: {
        account: {
          every: {
            id: { equals: account.id },
          },
        },
      },
    });

    expect(entries.length).toEqual(1);

    expect(entries[0].createdAt).toBeDefined();
  });

  describe('when an entry has already been created with the provided account ID', () => {
    it('should create an additional AuthenticationRetry entry associated with the provided account ID', async () => {
      await createAuthenticationRetryEntry(context, account.id);

      const entries = await context.db.AuthenticationRetry.findMany({
        where: {
          account: {
            every: {
              id: { equals: account.id },
            },
          },
        },
      });

      expect(entries.length).toEqual(2);
    });
  });

  it('should return success=true', async () => {
    const result = await createAuthenticationRetryEntry(context, account.id);

    const expected = {
      success: true,
    };

    expect(result).toEqual(expected);
  });

  describe('when the entry is not saved', () => {
    beforeEach(async () => {
      // delete the account so the relationship creation will fail
      await context.query.Account.deleteOne({
        where: { id: account.id },
      });
    });

    it('should throw an error', async () => {
      try {
        await createAuthenticationRetryEntry(context, account.id);
      } catch (err) {
        const expectedKeystoneError = `An error occured while resolving relationship fields.
  - AuthenticationRetry.account: Access denied: You cannot connect that Account - it may not exist`;

        const expected = new Error(expectedKeystoneError);

        expect(err).toEqual(expected);
      }
    });
  });
});
