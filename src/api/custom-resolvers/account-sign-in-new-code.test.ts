import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import accountSignInSendNewCode from './account-sign-in-new-code';
import baseConfig from '../keystone';
import generate from '../helpers/generate-otp';
import sendEmail from '../emails';
import { mockAccount, mockOTP, mockSendEmailResponse } from '../test-mocks';
import { Account, AccountSignInSendNewCodeVariables, AccountSignInResponse } from '../types';
import { Context } from '.keystone/types'; // eslint-disable-line

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

dotenv.config();

const context = getContext(config, PrismaModule) as Context;

describe('custom-resolvers/account-sign-in-new-code', () => {
  let exporter: Account;

  jest.mock('../emails');
  jest.mock('../helpers/generate-otp');

  generate.otp = () => mockOTP;

  let securityCodeEmailSpy = jest.fn();

  afterAll(() => {
    jest.resetAllMocks();
  });

  let account: Account;

  let result: AccountSignInResponse;

  let variables: AccountSignInSendNewCodeVariables;

  beforeEach(async () => {
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

    securityCodeEmailSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));

    sendEmail.securityCodeEmail = securityCodeEmailSpy;

    variables = {
      accountId: exporter.id,
    };

    result = await accountSignInSendNewCode({}, variables, context);

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
        ...mockSendEmailResponse,
        accountId: account.id,
      };

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

      result = await accountSignInSendNewCode({}, variables, context);

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
        await accountSignInSendNewCode({}, variables, context);
      } catch (err) {
        expect(securityCodeEmailSpy).toHaveBeenCalledTimes(1);

        const expected = new Error(`Generating and sending new sign in code for exporter account (accountSignInSendNewCode mutation) ${mockSendEmailResponse}`);
        expect(err).toEqual(expected);
      }
    });
  });
});
