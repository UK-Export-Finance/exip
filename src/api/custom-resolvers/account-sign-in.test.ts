import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import accountSignIn from './account-sign-in';
import baseConfig from '../keystone';
import generate from '../helpers/generate-otp';
import sendEmail from '../emails';
import { mockAccount, mockOTP } from '../test-mocks';
import { Account, AccountSignInResponse } from '../types';
import { Context } from '.keystone/types'; // eslint-disable-line

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

dotenv.config();

const context = getContext(config, PrismaModule) as Context;

describe('custom-resolvers/account-sign-in', () => {
  let exporter: Account;

  jest.mock('../emails');
  jest.mock('../helpers/generate-otp');

  generate.otp = () => mockOTP;

  const sendEmailResponse = { success: true, emailRecipient: mockAccount.email };

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

  let account: Account;

  let result: AccountSignInResponse;

  beforeAll(async () => {
    // wipe the table so we have a clean slate.
    const exporters = await context.query.Exporter.findMany();

    await context.query.Exporter.deleteMany({
      where: exporters,
    });

    // create an account
    exporter = (await context.query.Exporter.createOne({
      data: mockAccount,
      query: 'id',
    })) as Account;

    jest.resetAllMocks();

    securityCodeEmailSpy = jest.fn(() => Promise.resolve(sendEmailResponse));

    sendEmail.securityCodeEmail = securityCodeEmailSpy;

    result = await accountSignIn({}, variables, context);

    account = (await context.query.Exporter.findOne({
      where: { id: exporter.id },
      query: 'id firstName email otpSalt otpHash otpExpiry',
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
        ...sendEmailResponse,
        accountId: account.id,
      };

      expect(result).toEqual(expected);
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

  describe('when exporter is not verified', () => {
    test('it should return success=false', async () => {
      await context.query.Exporter.updateOne({
        where: { id: exporter.id },
        data: {
          isVerified: false,
        },
      });

      result = await accountSignIn({}, variables, context);

      const expected = { success: false };

      expect(result).toEqual(expected);
    });
  });

  describe('when no exporter is found', () => {
    test('it should return success=false', async () => {
      // wipe the table so we have a clean slate.
      const exporters = await context.query.Exporter.findMany();

      await context.query.Exporter.deleteMany({
        where: exporters,
      });

      result = await accountSignIn({}, variables, context);

      const expected = { success: false };

      expect(result).toEqual(expected);
    });
  });

  describe('error handling', () => {
    beforeEach(() => {
      sendEmail.securityCodeEmail = jest.fn(() => Promise.reject(sendEmailResponse));
    });

    test('should throw an error', async () => {
      try {
        await accountSignIn({}, variables, context);
      } catch (err) {
        expect(securityCodeEmailSpy).toHaveBeenCalledTimes(1);

        const expected = new Error(`Validating password or sending email for account sign in (accountSignIn mutation) ${sendEmailResponse}`);
        expect(err).toEqual(expected);
      }
    });
  });
});
