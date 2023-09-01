import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import getAuthenticationRetriesByAccountId from '.';
import createAuthenticationRetryEntry from '../create-authentication-retry-entry';
import baseConfig from '../../keystone';
import accounts from '../../test-helpers/accounts';
import authRetries from '../../test-helpers/auth-retries';
import { mockAccount } from '../../test-mocks';
import { Account } from '../../types';
import { Context } from '.keystone/types'; // eslint-disable-line

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

dotenv.config();

const context = getContext(config, PrismaModule) as Context;

describe('helpers/get-authentication-retries-by-account-id', () => {
  let account: Account;

  beforeEach(async () => {
    // wipe the table so we have a clean slate.
    await authRetries.deleteAll(context);

    const unblockedAccount = {
      ...mockAccount,
      isBlocked: false,
    };

    account = await accounts.create({ context, data: unblockedAccount });

    // create some new entries
    await createAuthenticationRetryEntry(context, account.id);
    await createAuthenticationRetryEntry(context, account.id);
  });

  it('should return a auth retries by account ID', async () => {
    const result = await getAuthenticationRetriesByAccountId(context, account.id);

    expect(result.length).toEqual(2);
  });
});
