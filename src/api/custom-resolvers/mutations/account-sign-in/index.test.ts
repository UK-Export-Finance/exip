import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import { ACCOUNT } from '../../../constants';
import accountSignIn from '.';
import baseConfig from '../../../keystone';
import createAuthenticationRetryEntry from '../../../helpers/create-authentication-retry-entry';
import generate from '../../../helpers/generate-otp';
import sendEmail from '../../../emails';
import { mockAccount, mockOTP, mockSendEmailResponse, mockUrlOrigin } from '../../../test-mocks';
import { Account, AccountSignInResponse, ApplicationRelationship } from '../../../types';
import { Context } from '.keystone/types'; // eslint-disable-line

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

dotenv.config();

const context = getContext(config, PrismaModule) as Context;

const { MAX_AUTH_RETRIES } = ACCOUNT;

describe('custom-resolvers/account-sign-in', () => {
  let account: Account;
  let retries: Array<ApplicationRelationship>;

  jest.mock('../../../emails');
  jest.mock('../../../helpers/generate-otp');

  generate.otp = () => mockOTP;

  let sendConfirmEmailAddressEmailSpy = jest.fn();
  let securityCodeEmailSpy = jest.fn();

  const mockPassword = String(process.env.MOCK_ACCOUNT_PASSWORD);

  const variables = {
    urlOrigin: mockUrlOrigin,
    email: mockAccount.email,
    password: mockPassword,
  };

  afterAll(() => {
    jest.resetAllMocks();
  });

  let result: AccountSignInResponse;

  beforeAll(async () => {
    // wipe the account table so we have a clean slate.
    const accounts = await context.query.Account.findMany();

    await context.query.Account.deleteMany({
      where: accounts,
    });

    // wipe the AuthenticationRetry table so we have a clean slate.
    retries = (await context.query.AuthenticationRetry.findMany()) as Array<ApplicationRelationship>;

    await context.query.AuthenticationRetry.deleteMany({
      where: retries,
    });

    // create an account
    account = (await context.query.Account.createOne({
      data: mockAccount,
      query: 'id',
    })) as Account;

    jest.resetAllMocks();

    securityCodeEmailSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));
    sendEmail.securityCodeEmail = securityCodeEmailSpy;

    result = await accountSignIn({}, variables, context);

    account = (await context.query.Account.findOne({
      where: { id: account.id },
      query: 'id firstName lastName email otpSalt otpHash otpExpiry verificationExpiry',
    })) as Account;
  });

  describe('when the provided password is invalid', () => {
    test('it should return success=false', async () => {
      variables.password = `${mockPassword}-incorrect`;

      result = await accountSignIn({}, variables, context);

      const expected = { success: false };

      expect(result).toEqual(expected);
    });

    test('it should retain the added authentication retry entry', async () => {
      // wipe the AuthenticationRetry table so we have a clean slate.
      retries = (await context.query.AuthenticationRetry.findMany()) as Array<ApplicationRelationship>;

      await context.query.AuthenticationRetry.deleteMany({
        where: retries,
      });

      await accountSignIn({}, variables, context);

      // get the latest retries
      retries = (await context.query.AuthenticationRetry.findMany()) as Array<ApplicationRelationship>;

      expect(retries.length).toEqual(1);
    });
  });

  describe('when the account is blocked', () => {
    beforeEach(async () => {
      account = (await context.query.Account.updateOne({
        where: { id: account.id },
        data: {
          isBlocked: true,
        },
      })) as Account;

      result = await accountSignIn({}, variables, context);
    });

    it('should return success=false, isBlocked=true and accountId', async () => {
      const expected = {
        success: false,
        isBlocked: true,
        accountId: account.id,
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when the account has ${MAX_AUTH_RETRIES} entries in the AuthenticationRetry table`, () => {
    beforeEach(async () => {
      // revert the previous account block so we have a clean slate.
      account = (await context.query.Account.updateOne({
        where: { id: account.id },
        data: {
          isBlocked: false,
        },
      })) as Account;

      // wipe the AuthenticationRetry table so we have a clean slate.
      retries = await context.query.AuthenticationRetry.findMany();

      await context.query.AuthenticationRetry.deleteMany({
        where: retries,
      });

      // generate an array of promises to create retry entries
      const entriesToCreate = [...Array(MAX_AUTH_RETRIES)].map(async () => createAuthenticationRetryEntry(context, account.id));

      await Promise.all(entriesToCreate);

      result = await accountSignIn({}, variables, context);
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

  describe('when no account is found', () => {
    test('it should return success=false', async () => {
      // wipe the table so we have a clean slate.
      const accounts = await context.query.Account.findMany();

      await context.query.Account.deleteMany({
        where: accounts,
      });

      result = await accountSignIn({}, variables, context);

      const expected = { success: false };

      expect(result).toEqual(expected);
    });
  });

  describe('error handling', () => {
    beforeEach(() => {
      sendEmail.securityCodeEmail = jest.fn(() => Promise.reject(mockSendEmailResponse));
    });

    test('should throw an error', async () => {
      try {
        await accountSignIn({}, variables, context);
      } catch (err) {
        expect(securityCodeEmailSpy).toHaveBeenCalledTimes(1);

        const expected = new Error(`Validating password or sending email for account sign in (accountSignIn mutation) ${mockSendEmailResponse}`);
        expect(err).toEqual(expected);
      }
    });
  });
});
