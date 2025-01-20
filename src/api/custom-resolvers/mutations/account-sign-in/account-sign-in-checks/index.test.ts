import dotenv from 'dotenv';
import accountSignInChecks from '.';
import confirmEmailAddressEmail from '../../../../helpers/send-email-confirm-email-address';
import generate from '../../../../helpers/generate-otp';
import getFullNameString from '../../../../helpers/get-full-name-string';
import sendEmail from '../../../../emails';
import accounts from '../../../../test-helpers/accounts';
import accountStatusHelper from '../../../../test-helpers/account-status';
import getKeystoneContext from '../../../../test-helpers/get-keystone-context';
import { mockAccount, mockOTP, mockSendEmailResponse, mockUrlOrigin, mockErrorMessage, mockSpyPromiseRejection } from '../../../../test-mocks';
import { Account, Context } from '../../../../types';

dotenv.config();

const originalEnv = { ...process.env };

describe('custom-resolvers/account-sign-in/account-sign-in-checks', () => {
  let context: Context;
  let account: Account;

  jest.mock('../../../../emails');
  jest.mock('../../../../helpers/generate-otp');

  generate.otp = () => mockOTP;

  let consoleSpy = jest.fn();
  let sendConfirmEmailAddressEmailSpy = jest.fn();
  let accessCodeEmailSpy = jest.fn();

  const mockPassword = String(process.env.MOCK_ACCOUNT_PASSWORD);

  const variables = {
    urlOrigin: mockUrlOrigin,
    email: mockAccount.email,
    password: mockPassword,
  };

  beforeAll(() => {
    context = getKeystoneContext();
  });

  afterAll(() => {
    process.env = originalEnv;

    jest.resetAllMocks();
  });

  beforeEach(async () => {
    await accounts.deleteAll(context);

    // create an account
    account = await accounts.create({ context });
    await accountStatusHelper.update(context, account.status.id, { isVerified: true });
    // gets updated account
    account = await accounts.get(context, account.id);

    jest.resetAllMocks();

    accessCodeEmailSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));
    sendEmail.accessCodeEmail = accessCodeEmailSpy;
  });

  describe('when the account is verified', () => {
    it('should generate an OTP and save to the account', async () => {
      await accountSignInChecks(context, account, mockUrlOrigin);

      account = await accounts.get(context, account.id);

      expect(account.otpSalt).toEqual(mockOTP.salt);
      expect(account.otpHash).toEqual(mockOTP.hash);
      expect(new Date(account.otpExpiry)).toEqual(mockOTP.expiry);
    });

    describe('when NODE_ENV is `development`', () => {
      beforeAll(() => {
        process.env.NODE_ENV = 'development';
      });

      beforeEach(() => {
        jest.resetAllMocks();

        console.info = consoleSpy;

        accessCodeEmailSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));
        sendEmail.accessCodeEmail = accessCodeEmailSpy;
      });

      it('should NOT call sendEmail.confirmEmailAddress', async () => {
        await accountSignInChecks(context, account, mockUrlOrigin);

        expect(accessCodeEmailSpy).toHaveBeenCalledTimes(0);
      });

      it('should log out an OTP', async () => {
        await accountSignInChecks(context, account, mockUrlOrigin);

        const flattenedSpys = consoleSpy.mock.calls.flat();

        const assertion1 = flattenedSpys.includes('✅ Signing in account (dev environment only) - mimicking sending OTP via email %s');
        const assertion2 = flattenedSpys.includes(mockOTP.securityCode);

        expect(assertion1).toEqual(true);
        expect(assertion2).toEqual(true);
      });

      it('should return an accountId and success=true', async () => {
        const result = await accountSignInChecks(context, account, mockUrlOrigin);

        const expected = {
          accountId: account.id,
          success: true,
        };

        expect(result).toEqual(expected);
      });
    });

    describe('when NODE_ENV is NOT `development`', () => {
      consoleSpy = jest.fn();

      beforeAll(() => {
        process.env.NODE_ENV = 'not-development';
      });

      beforeEach(() => {
        jest.resetAllMocks();

        console.info = consoleSpy;

        accessCodeEmailSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));
        sendEmail.accessCodeEmail = accessCodeEmailSpy;
      });

      it('should call sendEmail.confirmEmailAddress', async () => {
        await accountSignInChecks(context, account, mockUrlOrigin);

        expect(accessCodeEmailSpy).toHaveBeenCalledTimes(1);

        const name = getFullNameString(account);

        expect(accessCodeEmailSpy).toHaveBeenCalledWith(account.email, name, mockOTP.securityCode);
      });

      it('should NOT log out an OTP', async () => {
        await accountSignInChecks(context, account, mockUrlOrigin);

        const flattenedSpys = consoleSpy.mock.calls.flat();

        const assertion = flattenedSpys.includes('(dev environment only) - mimicking');

        expect(assertion).toEqual(false);
      });

      it('should return the email response and accountId', async () => {
        const result = await accountSignInChecks(context, account, mockUrlOrigin);

        const expected = {
          ...mockSendEmailResponse,
          accountId: account.id,
        };

        expect(result).toEqual(expected);
      });
    });
  });

  describe('when the account is NOT verified', () => {
    let updatedAccount: Account;

    beforeEach(async () => {
      jest.resetAllMocks();

      const accountUpdate = {
        verificationHash: '',
        verificationExpiry: null,
      };

      sendConfirmEmailAddressEmailSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));
      confirmEmailAddressEmail.send = sendConfirmEmailAddressEmailSpy;

      accessCodeEmailSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));
      sendEmail.accessCodeEmail = accessCodeEmailSpy;

      await accountStatusHelper.update(context, account.status.id, { isVerified: false });

      updatedAccount = await context.query.Account.updateOne({
        where: { id: account.id },
        data: accountUpdate,
        query: 'id firstName lastName email verificationHash status { isVerified isBlocked }',
      });
    });

    it('should call confirmEmailAddressEmail.send', async () => {
      await accountSignInChecks(context, updatedAccount, mockUrlOrigin);

      expect(sendConfirmEmailAddressEmailSpy).toHaveBeenCalledTimes(1);
      expect(sendConfirmEmailAddressEmailSpy).toHaveBeenCalledWith(context, variables.urlOrigin, account.id);
    });

    it('should NOT call sendEmail.accessCodeEmail', async () => {
      await accountSignInChecks(context, updatedAccount, mockUrlOrigin);

      expect(accessCodeEmailSpy).toHaveBeenCalledTimes(0);
    });

    it('should return success=false, accountId and resentVerificationEmail=true', async () => {
      const result = await accountSignInChecks(context, updatedAccount, mockUrlOrigin);

      const expected = {
        success: false,
        resentVerificationEmail: true,
        accountId: account.id,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('error handling', () => {
    beforeEach(() => {
      sendEmail.accessCodeEmail = mockSpyPromiseRejection;
    });

    it('should throw an error', async () => {
      try {
        await accountSignInChecks(context, account, mockUrlOrigin);
      } catch (error) {
        expect(accessCodeEmailSpy).toHaveBeenCalledTimes(1);

        const expected = new Error(
          `Validating password or sending email(s) for account sign in (accountSignIn mutation - account checks) ${new Error(mockErrorMessage)}`,
        );

        expect(error).toEqual(expected);
      }
    });
  });
});
