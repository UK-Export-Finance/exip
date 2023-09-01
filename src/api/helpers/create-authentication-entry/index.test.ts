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
    account = await accounts.create({ context });
  });

  test('it should create a new entry and return the entry with a timestamp', async () => {
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
