import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import { ACCOUNT, DATE_ONE_MINUTE_IN_THE_PAST } from '../../../constants';
import accountSignIn from '.';
import baseConfig from '../../../keystone';
import createAuthenticationRetryEntry from '../../../helpers/create-authentication-retry-entry';
import confirmEmailAddressEmail from '../../../helpers/send-email-confirm-email-address';
import generate from '../../../helpers/generate-otp';
import getFullNameString from '../../../helpers/get-full-name-string';
import sendEmail from '../../../emails';
import { mockAccount, mockOTP, mockSendEmailResponse, mockUrlOrigin } from '../../../test-mocks';
import { Account, AccountSignInResponse, ApplicationRelationship } from '../../../types';
import { Context } from '.keystone/types'; // eslint-disable-line

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

dotenv.config();

const context = getContext(config, PrismaModule) as Context;

const { EMAIL, MAX_AUTH_RETRIES } = ACCOUNT;

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

  describe('when the provided password is valid', () => {
    test('it should generate an OTP and save to the account', () => {
      expect(account.otpSalt).toEqual(mockOTP.salt);
      expect(account.otpHash).toEqual(mockOTP.hash);
      expect(new Date(account.otpExpiry)).toEqual(mockOTP.expiry);
    });

    test('it should call sendEmail.securityCodeEmail', () => {
      const { email } = account;

      const name = getFullNameString(account);

      expect(securityCodeEmailSpy).toHaveBeenCalledTimes(1);
      expect(securityCodeEmailSpy).toHaveBeenCalledWith(email, name, mockOTP.securityCode);
    });

    test('it should return the email response and accountId', () => {
      const expected = {
        ...mockSendEmailResponse,
        accountId: account.id,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when account is not verified, but has a verificationHash and verificationExpiry has not expired', () => {
    beforeEach(async () => {
      jest.resetAllMocks();

      sendConfirmEmailAddressEmailSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));
      confirmEmailAddressEmail.send = sendConfirmEmailAddressEmailSpy;

      await context.query.Account.updateOne({
        where: { id: account.id },
        data: {
          isVerified: false,
          isBlocked: false,
          verificationHash: mockAccount.verificationHash,
        },
      });

      result = await accountSignIn({}, variables, context);
    });

    describe('verificationExpiry', () => {
      let updatedAccount: Account;
      let newExpiryDay: number;

      beforeEach(async () => {
        updatedAccount = (await context.query.Account.findOne({
          where: { id: account.id },
          query: 'verificationExpiry',
        })) as Account;

        newExpiryDay = new Date(updatedAccount.verificationExpiry).getDate();
      });

      test('it should be reset and have a new day vale', async () => {
        const expectedExpiryDay = new Date(EMAIL.VERIFICATION_EXPIRY()).getDate();

        expect(newExpiryDay).toEqual(expectedExpiryDay);
      });

      test('the account`s verificationExpiry should NOT have have the same day as the previous verificationExpiry', async () => {
        const originalExpiryDay = new Date(account.verificationExpiry).getDay();

        expect(newExpiryDay).not.toEqual(originalExpiryDay);
      });
    });

    test('it should call confirmEmailAddressEmail.send', async () => {
      expect(sendConfirmEmailAddressEmailSpy).toHaveBeenCalledTimes(1);
      expect(sendConfirmEmailAddressEmailSpy).toHaveBeenCalledWith(context, variables.urlOrigin, account.id);
    });

    test('it should return success=false, accountId and resentVerificationEmail=true', async () => {
      const expected = {
        success: false,
        resentVerificationEmail: true,
        accountId: account.id,
      };

      expect(result).toEqual(expected);
    });

    describe('when the verificationExpiry is after now', () => {
      beforeEach(async () => {
        jest.resetAllMocks();

        // wipe the AuthenticationRetry table so we have a clean slate.
        retries = (await context.query.AuthenticationRetry.findMany()) as Array<ApplicationRelationship>;

        await context.query.AuthenticationRetry.deleteMany({
          where: retries,
        });

        const oneMinuteInThePast = DATE_ONE_MINUTE_IN_THE_PAST();

        await context.query.Account.updateOne({
          where: { id: account.id },
          data: {
            verificationExpiry: oneMinuteInThePast,
          },
        });
      });

      test('it should NOT call confirmEmailAddressEmail.send', async () => {
        await accountSignIn({}, variables, context);

        expect(sendConfirmEmailAddressEmailSpy).toHaveBeenCalledTimes(0);
      });

      test('it should return success=false', async () => {
        result = await accountSignIn({}, variables, context);

        const expected = { success: false };

        expect(result).toEqual(expected);
      });
    });
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
