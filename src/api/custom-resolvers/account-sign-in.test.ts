import { getContext } from '@keystone-6/core/context';
import dotenv from 'dotenv';
import * as PrismaModule from '.prisma/client'; // eslint-disable-line import/no-extraneous-dependencies
import accountSignIn from './account-sign-in';
import baseConfig from '../keystone';
import createAccount from './create-account';
import generate from '../helpers/generate-otp';
import sendEmail from '../emails';
import { mockAccount } from '../test-mocks';
import { Account } from '../types';
import { Context } from '.keystone/types'; // eslint-disable-line

const dbUrl = String(process.env.DATABASE_URL);
const config = { ...baseConfig, db: { ...baseConfig.db, url: dbUrl } };

dotenv.config();

const context = getContext(config, PrismaModule) as Context;

describe('custom-resolvers/account-sign-in', () => {
  let exporter: Account;

  jest.mock('../emails');
  jest.mock('../helpers/generate-otp');

  const mockOtp = {
    securityCode: '123456',
    salt: 'mockSalt',
    hash: 'mockHash',
    expiry: new Date(),
  };

  generate.otp = () => mockOtp;

  const sendEmailResponse = { success: true, emailRecipient: mockAccount.email };

  const securityCodeEmailSpy = jest.fn(() => Promise.resolve(sendEmailResponse));

  sendEmail.securityCodeEmail = securityCodeEmailSpy;

  const mockPassword = 'AmazingPassword123!';

  const variables = {
    firstName: 'a',
    lastName: 'b',
    email: mockAccount.email,
    password: mockPassword,
  };

  beforeAll(async () => {
    exporter = await createAccount({}, { data: variables }, context);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when the provided password is valid', () => {
    test('it should generate an OTP and save to the account', async () => {
      await accountSignIn({}, variables, context);

      const account = await context.query.Exporter.findOne({
        where: { id: exporter.id },
        query: 'id otpSalt otpHash otpExpiry',
      });

      expect(account.otpSalt).toEqual(mockOtp.salt);
      expect(account.otpHash).toEqual(mockOtp.hash);
      expect(new Date(account.otpExpiry)).toEqual(mockOtp.expiry);
    });

    test('it should call sendEmail.securityCodeEmail', async () => {
      await accountSignIn({}, variables, context);

      const { email, firstName } = exporter;

      expect(securityCodeEmailSpy).toHaveBeenCalledTimes(1);
      expect(securityCodeEmailSpy).toHaveBeenCalledWith(email, firstName, mockOtp.securityCode);
    });

    test('it should return the eamil response', async () => {
      const result = await accountSignIn({}, variables, context);

      expect(result).toEqual(sendEmailResponse);
    });
  });

  describe('when the provided password is invalid', () => {
    test('it should return success=false', async () => {
      variables.password = `${mockPassword}-incorrect`;

      const result = await accountSignIn({}, variables, context);

      const expected = { success: false };

      expect(result).toEqual(expected);
    });
  });

  describe('when no exporter is found', () => {
    test('it should return success=false', async () => {
      // delete the exporter
      await context.query.Exporter.deleteOne({
        where: { id: exporter.id },
      });

      const result = await accountSignIn({}, variables, context);

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
