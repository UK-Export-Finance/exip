import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import hasAccountUsedPasswordBefore from '.';
import createAuthenticationEntry from '../create-authentication-entry';
import baseConfig from '../../keystone';
import accounts from '../../test-helpers/accounts';
import { mockAccount } from '../../test-mocks';
import { Account, Context } from '../../types';

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

dotenv.config();

const context = getContext(config, PrismaModule) as Context;

const { salt, hash } = mockAccount;

describe('helpers/account-has-used-password-before', () => {
  let account: Account;
  let mockEntry: object;

  beforeAll(async () => {
    account = await accounts.create({ context });

    // wipe the Authentication table so we have a clean slate.
    const retries = await context.query.Authentication.findMany();

    await context.query.Authentication.deleteMany({
      where: retries,
    });

    mockEntry = {
      account: {
        connect: {
          id: account.id,
        },
      },
      salt,
      hash,
    };
  });

  afterAll(async () => {
    const retries = await context.query.Authentication.findMany();

    await context.query.Authentication.deleteMany({
      where: retries,
    });
  });

  describe('when a provided password has been used before', () => {
    it('should return true', async () => {
      const mockNewPassword = String(process.env.MOCK_ACCOUNT_PASSWORD);

      await context.db.Authentication.createOne({
        data: mockEntry,
      });

      const result = await hasAccountUsedPasswordBefore(context, account.id, mockNewPassword);

      expect(result).toEqual(true);
    });
  });

  describe('when a provided password has NOT been used before', () => {
    it('should return false', async () => {
      const mockNewPassword = `${process.env.MOCK_ACCOUNT_PASSWORD}-modified`;

      await createAuthenticationEntry(context, mockEntry);

      const result = await hasAccountUsedPasswordBefore(context, account.id, mockNewPassword);

      expect(result).toEqual(false);
    });
  });
});
