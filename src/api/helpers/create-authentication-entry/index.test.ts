import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import createAuthenticationEntry from '.';
import baseConfig from '../../keystone';
import accounts from '../../test-helpers/accounts';
import { mockAccount } from '../../test-mocks';
import { Account } from '../../types';
import { Context } from '.keystone/types'; // eslint-disable-line

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

dotenv.config();

const context = getContext(config, PrismaModule) as Context;

describe('helpers/create-authentication-entry', () => {
  let account: Account;
  let result;

  beforeAll(async () => {
    // wipe the table so we have a clean slate.
    const entries = await context.query.Authentication.findMany();

    await context.query.Authentication.deleteMany({
      where: entries,
    });

    expect(entries.length).toEqual(0);

    account = await accounts.create({ context });

    const authEntry = {
      account: {
        connect: {
          id: account.id,
        },
      },
      salt: mockAccount.salt,
      hash: mockAccount.hash,
    };

    result = await createAuthenticationEntry(context, authEntry);
  });

  afterAll(async () => {
    // wipe the table so we have a clean slate.
    const entries = await context.query.Authentication.findMany();

    await context.query.Authentication.deleteMany({
      where: entries,
    });
  });

  test('it should create a new entry', async () => {
    const entries = await context.query.Authentication.findMany();

    expect(entries.length).toEqual(1);
  });

  test('it should return the entry with a timestamp', async () => {
    const authEntry = {
      account: {
        connect: {
          id: account.id,
        },
      },
      salt: mockAccount.salt,
      hash: mockAccount.hash,
    };

    result = await createAuthenticationEntry(context, authEntry);

    expect(result.createdAt).toBeDefined();
    expect(result.hash).toEqual(mockAccount.hash);
    expect(result.salt).toEqual(mockAccount.salt);
  });
});
