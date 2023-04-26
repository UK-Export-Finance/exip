import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import accountPasswordReset from './account-password-reset';
import baseConfig from '../../keystone';
import { ACCOUNT } from '../../constants';
import { mockAccount } from '../../test-mocks';
import { Account, AccountPasswordResetVariables, SuccessResponse } from '../../types';
import { Context } from '.keystone/types'; // eslint-disable-line

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

dotenv.config();

const context = getContext(config, PrismaModule) as Context;

const { ENCRYPTION } = ACCOUNT;

const {
  RANDOM_BYTES_SIZE,
  PASSWORD: {
    PBKDF2: { KEY_LENGTH },
  },
} = ENCRYPTION;

describe('custom-resolvers/account-password-reset', () => {
  let account: Account;

  afterAll(() => {
    jest.resetAllMocks();
  });

  let result: SuccessResponse;

  let variables: AccountPasswordResetVariables;

  beforeEach(async () => {
    // wipe the table so we have a clean slate.
    const accounts = await context.query.Exporter.findMany();

    await context.query.Exporter.deleteMany({
      where: accounts,
    });

    // create an account
    account = (await context.query.Exporter.createOne({
      data: mockAccount,
      query: 'id',
    })) as Account;

    variables = {
      token: String(mockAccount.passwordResetHash),
      password: String(process.env.MOCK_ACCOUNT_PASSWORD),
    };

    result = await accountPasswordReset({}, variables, context);

    account = (await context.query.Exporter.findOne({
      where: { id: account.id },
      query: 'id salt hash passwordResetHash passwordResetExpiry',
    })) as Account;
  });

  test('it should return success=true', () => {
    const expected = {
      success: true,
    };

    expect(result).toEqual(expected);
  });

  test("it should update the account's salt and hash", async () => {
    // get the latest account
    account = (await context.query.Exporter.findOne({
      where: { id: account.id },
      query: 'id salt hash passwordResetHash passwordResetExpiry',
    })) as Account;

    expect(account.salt).toBeDefined();
    expect(account.salt.length).toEqual(RANDOM_BYTES_SIZE * 2);
    expect(account.salt).not.toEqual(mockAccount.salt);

    expect(account.hash).toBeDefined();
    expect(account.hash.length).toEqual(KEY_LENGTH * 2);
    expect(account.hash).not.toEqual(mockAccount.hash);
  });

  test("it nullify the account's password reset hash and expiry", async () => {
    expect(account.passwordResetHash).toEqual('');
    expect(account.passwordResetExpiry).toEqual(null);
  });

  describe('when the account does not have a password reset expiry', () => {
    test('it should return success=false', async () => {
      account = (await context.query.Exporter.updateOne({
        where: { id: account.id },
        data: {
          passwordResetHash: mockAccount.passwordResetHash,
          passwordResetExpiry: null,
        },
      })) as Account;

      result = await accountPasswordReset({}, variables, context);

      const expected = {
        success: false,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when the account does not have a password reset hash', () => {
    test('it should return success=false', async () => {
      account = (await context.query.Exporter.updateOne({
        where: { id: account.id },
        data: {
          passwordResetHash: '',
        },
      })) as Account;

      result = await accountPasswordReset({}, variables, context);

      const expected = {
        success: false,
      };

      expect(result).toEqual(expected);
    });
  });

  describe("when the account's password reset expiry is in the past", () => {
    beforeEach(async () => {
      const now = new Date();

      const milliseconds = 300000;
      const oneMinuteAgo = new Date(now.setMilliseconds(-milliseconds)).toISOString();

      account = (await context.query.Exporter.updateOne({
        where: { id: account.id },
        data: {
          passwordResetHash: mockAccount.passwordResetHash,
          passwordResetExpiry: oneMinuteAgo,
        },
      })) as Account;
    });

    test('it should return success=false with expired=true', async () => {
      result = await accountPasswordReset({}, variables, context);

      const expected = {
        success: false,
        expired: true,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when no account is found', () => {
    test('it should return success=false', async () => {
      // wipe the table so we have a clean slate.
      const accounts = await context.query.Exporter.findMany();

      await context.query.Exporter.deleteMany({
        where: accounts,
      });

      result = await accountPasswordReset({}, variables, context);

      const expected = { success: false };

      expect(result).toEqual(expected);
    });
  });
});
