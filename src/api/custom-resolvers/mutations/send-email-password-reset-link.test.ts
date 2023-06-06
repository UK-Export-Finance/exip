import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import baseConfig from '../../keystone';
import sendEmailPasswordResetLink from './send-email-password-reset-link';
import createAuthenticationRetryEntry from '../../helpers/create-authentication-retry-entry';
import getFullNameString from '../../helpers/get-full-name-string';
import sendEmail from '../../emails';
import { ACCOUNT } from '../../constants';
import { mockAccount, mockUrlOrigin, mockSendEmailResponse } from '../../test-mocks';
import { Account, SuccessResponse } from '../../types';
import { Context } from '.keystone/types'; // eslint-disable-line

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

dotenv.config();

const context = getContext(config, PrismaModule) as Context;

const {
  ENCRYPTION: {
    PASSWORD: {
      PBKDF2: { KEY_LENGTH },
    },
  },
  MAX_PASSWORD_RESET_TRIES,
} = ACCOUNT;

describe('custom-resolvers/send-email-password-reset-link', () => {
  let account: Account;
  let result: SuccessResponse;

  jest.mock('../../emails');

  let passwordResetLinkSpy = jest.fn();

  const variables = {
    urlOrigin: mockUrlOrigin,
    email: mockAccount.email,
  };

  afterAll(() => {
    jest.resetAllMocks();
  });

  beforeEach(async () => {
    // wipe the accounts table so we have a clean slate.
    const accounts = await context.query.Account.findMany();

    await context.query.Account.deleteMany({
      where: accounts,
    });

    // wipe the AuthenticationRetry table so we have a clean slate.
    const retries = await context.query.AuthenticationRetry.findMany();

    await context.query.AuthenticationRetry.deleteMany({
      where: retries,
    });

    // create an account
    account = (await context.query.Account.createOne({
      data: mockAccount,
      query: 'id',
    })) as Account;

    jest.resetAllMocks();

    passwordResetLinkSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));

    sendEmail.passwordResetLink = passwordResetLinkSpy;

    result = await sendEmailPasswordResetLink({}, variables, context);

    // get the latest account
    account = (await context.query.Account.findOne({
      where: { id: account.id },
      query: 'id email firstName lastName passwordResetHash passwordResetExpiry isBlocked',
    })) as Account;

    expect(account.isBlocked).toEqual(false);
  });

  it('should return the email response', () => {
    expect(result).toEqual(mockSendEmailResponse);
  });

  it('should generate a passwordResetHash and add to the account', async () => {
    expect(account.passwordResetHash.length).toEqual(KEY_LENGTH * 2);
  });

  it('should generate and add a passwordResetExpiry to the account', async () => {
    const now = new Date();

    const nowDay = now.getDay();
    const nowMonth = now.getMonth();
    const nowYear = now.getFullYear();

    const expiry = new Date(account.passwordResetExpiry);

    const expiryDay = expiry.getDay();
    const expiryMonth = expiry.getMonth();
    const expiryYear = expiry.getFullYear();

    expect(expiryDay).toEqual(nowDay);
    expect(expiryMonth).toEqual(nowMonth);
    expect(expiryYear).toEqual(nowYear);

    const secondsDifference = (expiry.getTime() - now.getTime()) / 1000;

    // round up (slight millisecond difference in unit tests)
    const rounded = Math.ceil(secondsDifference);

    // 5 minutes
    const expectedSeconds = 60 * 5;

    expect(rounded).toEqual(expectedSeconds);
  });

  test('it should call sendEmail.passwordResetLink', () => {
    const { email, passwordResetHash } = account;

    const name = getFullNameString(account);

    expect(passwordResetLinkSpy).toHaveBeenCalledTimes(1);
    expect(passwordResetLinkSpy).toHaveBeenCalledWith(mockUrlOrigin, email, name, passwordResetHash);
  });

  it('should create a new entry in the AuthenticationRetry table', async () => {
    // wipe the AuthenticationRetry table so we have a clean slate.
    let retries = await context.query.AuthenticationRetry.findMany();

    await context.query.AuthenticationRetry.deleteMany({
      where: retries,
    });

    retries = await context.query.AuthenticationRetry.findMany();

    expect(retries.length).toEqual(0);

    await sendEmailPasswordResetLink({}, variables, context);

    retries = await context.query.AuthenticationRetry.findMany();

    expect(retries.length).toEqual(1);
  });

  describe('when AuthenticationRetry table entry fails', () => {
    test('it should return success=false', async () => {
      // delete the account so the relationship creation will fail
      await context.query.Account.deleteOne({
        where: {
          id: account.id,
        },
      });

      result = await sendEmailPasswordResetLink({}, variables, context);

      const expected = { success: false };

      expect(result).toEqual(expected);
    });
  });

  describe('when no account is found', () => {
    test('it should return success=false', async () => {
      // wipe the table so we have a clean slate.
      const accounts = await context.query.Account.findMany();

      await context.query.Account.deleteMany({
        where: accounts,
      });

      result = await sendEmailPasswordResetLink({}, variables, context);

      const expected = { success: false };

      expect(result).toEqual(expected);
    });
  });

  describe(`when the account has ${MAX_PASSWORD_RESET_TRIES} entries in the AuthenticationRetry table`, () => {
    beforeEach(async () => {
      // wipe the AuthenticationRetry table so we have a clean slate.
      const retries = await context.query.AuthenticationRetry.findMany();

      await context.query.AuthenticationRetry.deleteMany({
        where: retries,
      });

      // generate an array of promises to create retry entries
      const entriesToCreate = [...Array(MAX_PASSWORD_RESET_TRIES)].map(async () => createAuthenticationRetryEntry(context, account.id));

      await Promise.all(entriesToCreate);

      result = await sendEmailPasswordResetLink({}, variables, context);
    });

    it('should return success=false, isBlocked=true and accountId', async () => {
      const expected = {
        success: false,
        isBlocked: true,
        accountId: account.id,
      };

      expect(result).toEqual(expected);
    });

    it('should mark the account as isBlocked=true', async () => {
      // get the latest account
      account = (await context.query.Account.findOne({
        where: { id: account.id },
        query: 'id isBlocked',
      })) as Account;

      expect(account.isBlocked).toEqual(true);
    });
  });

  describe('error handling', () => {
    beforeEach(() => {
      sendEmail.passwordResetLink = jest.fn(() => Promise.reject(mockSendEmailResponse));
    });

    test('should throw an error', async () => {
      try {
        await sendEmailPasswordResetLink({}, variables, context);
      } catch (err) {
        expect(passwordResetLinkSpy).toHaveBeenCalledTimes(1);

        const expected = new Error(`Checking account and sending password reset email (sendEmailPasswordResetLink mutation) ${mockSendEmailResponse}`);
        expect(err).toEqual(expected);
      }
    });
  });
});
