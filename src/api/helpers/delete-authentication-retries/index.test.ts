import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import deleteAuthenticationRetries from '.';
import baseConfig from '../../keystone';
import accounts from '../../test-helpers/accounts';
import authRetries from '../../test-helpers/auth-retries';
import { Account } from '../../types';
import { Context } from '.keystone/types'; // eslint-disable-line

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

dotenv.config();

const context = getContext(config, PrismaModule) as Context;

describe('helpers/delete-authentication-retries', () => {
  let account: Account;

  afterAll(() => {
    jest.resetAllMocks();
  });

  beforeAll(async () => {
    // wipe the AuthenticationRetry table so we have a clean slate.
    await authRetries.deleteAll(context);

    account = await accounts.create({ context });

    // create some entries
    const mockEntry = {
      account: {
        connect: {
          id: account.id,
        },
      },
      createdAt: new Date(),
    };

    await context.query.AuthenticationRetry.createMany({
      data: [mockEntry, mockEntry],
    });
  });

  test(`it should wipe the account's retry entires`, async () => {
    // check initial retries count
    let retries = await authRetries.findAll(context);

    expect(retries.length).toEqual(2);

    // call the function
    await deleteAuthenticationRetries(context, account.id);

    // get the latest retries to check they have been deleted
    retries = await authRetries.findAll(context);

    expect(retries.length).toEqual(0);
  });
});
