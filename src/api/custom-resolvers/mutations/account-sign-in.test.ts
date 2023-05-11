import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import { ACCOUNT } from '../../constants';
import accountSignIn from './account-sign-in';
import baseConfig from '../../keystone';
import confirmEmailAddressEmail from '../../helpers/send-email-confirm-email-address';
import generate from '../../helpers/generate-otp';
import sendEmail from '../../emails';
import { mockAccount, mockOTP, mockSendEmailResponse } from '../../test-mocks';
import { Account, AccountSignInResponse } from '../../types';
import { Context } from '.keystone/types'; // eslint-disable-line

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

dotenv.config();

const context = getContext(config, PrismaModule) as Context;

const { EMAIL } = ACCOUNT;

describe('custom-resolvers/account-sign-in', () => {
  let account: Account;

  jest.mock('../../emails');
  jest.mock('../../helpers/generate-otp');

  generate.otp = () => mockOTP;

  let sendConfirmEmailAddressEmailSpy = jest.fn();
  let securityCodeEmailSpy = jest.fn();

  const mockPassword = String(process.env.MOCK_ACCOUNT_PASSWORD);

  const variables = {
    firstName: 'a',
    lastName: 'b',
    email: mockAccount.email,
    password: mockPassword,
  };

  afterAll(() => {
    jest.resetAllMocks();
  });

  let result: AccountSignInResponse;

  beforeAll(async () => {
    // wipe the table so we have a clean slate.
    const accounts = await context.query.Account.findMany();

    await context.query.Account.deleteMany({
      where: accounts,
    });

    // create an account
    account = (await context.query.Account.createOne({
      data: mockAccount,
      query: 'id',
    })) as Account;

    jest.resetAllMocks();

    // sendConfirmEmailAddressEmailSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));
    // confirmEmailAddressEmail.send = sendConfirmEmailAddressEmailSpy;

    securityCodeEmailSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));
    sendEmail.securityCodeEmail = securityCodeEmailSpy;

    result = await accountSignIn({}, variables, context);

    account = (await context.query.Account.findOne({
      where: { id: account.id },
      query: 'id firstName email otpSalt otpHash otpExpiry verificationExpiry',
    })) as Account;
  });

  describe('when the provided password is valid', () => {
    test('it should generate an OTP and save to the account', () => {
      expect(account.otpSalt).toEqual(mockOTP.salt);
      expect(account.otpHash).toEqual(mockOTP.hash);
      expect(new Date(account.otpExpiry)).toEqual(mockOTP.expiry);
    });

    test('it should call sendEmail.securityCodeEmail', () => {
      const { email, firstName } = account;

      expect(securityCodeEmailSpy).toHaveBeenCalledTimes(1);
      expect(securityCodeEmailSpy).toHaveBeenCalledWith(email, firstName, mockOTP.securityCode);
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
          verificationHash: mockAccount.verificationHash,
        },
      });

      result = await accountSignIn({}, variables, context);
    });

    test('it should reset the account`s verificationExpiry', async () => {
      const updatedAccount = (await context.query.Account.findOne({
        where: { id: account.id },
        query: 'verificationExpiry',
      })) as Account;

      const originalExpiry = {
        day: new Date(account.verificationExpiry).getDay(),
      };

      const expectedExpiry = {
        day: new Date(EMAIL.VERIFICATION_EXPIRY()).getDate(),
      };

      const newExpiry = {
        day: new Date(updatedAccount.verificationExpiry).getDate(),
      };

      expect(newExpiry.day).not.toEqual(originalExpiry.day);

      expect(newExpiry.day).toEqual(expectedExpiry.day);
    });

    test('it should call confirmEmailAddressEmail.send', async () => {
      expect(sendConfirmEmailAddressEmailSpy).toHaveBeenCalledTimes(1);
      expect(sendConfirmEmailAddressEmailSpy).toHaveBeenCalledWith(context, account.id);
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

        const now = new Date();

        const milliseconds = 300000;
        const oneMinuteAgo = new Date(now.setMilliseconds(-milliseconds)).toISOString();

        await context.query.Account.updateOne({
          where: { id: account.id },
          data: {
            verificationExpiry: oneMinuteAgo,
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
