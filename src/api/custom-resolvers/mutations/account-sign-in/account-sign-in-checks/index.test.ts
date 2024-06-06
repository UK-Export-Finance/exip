import dotenv from 'dotenv';
import accountSignInChecks from '.';
import confirmEmailAddressEmail from '../../../../helpers/send-email-confirm-email-address';
import generate from '../../../../helpers/generate-otp';
import getFullNameString from '../../../../helpers/get-full-name-string';
import sendEmail from '../../../../emails';
import accounts from '../../../../test-helpers/accounts';
import accountStatusHelper from '../../../../test-helpers/account-status';
import getKeystoneContext from '../../../../test-helpers/get-keystone-context';
import { mockAccount, mockOTP, mockSendEmailResponse, mockUrlOrigin } from '../../../../test-mocks';
import { Account, AccountSignInResponse, Context } from '../../../../types';

dotenv.config();

describe('custom-resolvers/account-sign-in/account-sign-in-checks', () => {
  let context: Context;
  let account: Account;

  jest.mock('../../../../emails');
  jest.mock('../../../../helpers/generate-otp');

  generate.otp = () => mockOTP;

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
    jest.resetAllMocks();
  });

  let result: AccountSignInResponse;

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

    result = await accountSignInChecks(context, account, mockUrlOrigin);

    account = await accounts.get(context, account.id);
  });

  describe('when the account is verified', () => {
    test('it should generate an OTP and save to the account', () => {
      expect(account.otpSalt).toEqual(mockOTP.salt);
      expect(account.otpHash).toEqual(mockOTP.hash);
      expect(new Date(account.otpExpiry)).toEqual(mockOTP.expiry);
    });

    test('it should call sendEmail.accessCodeEmail', () => {
      const { email } = account;

      const name = getFullNameString(account);

      expect(accessCodeEmailSpy).toHaveBeenCalledTimes(1);
      expect(accessCodeEmailSpy).toHaveBeenCalledWith(email, name, mockOTP.securityCode);
    });

    test('it should return the email response and accountId', () => {
      const expected = {
        ...mockSendEmailResponse,
        accountId: account.id,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when the account is NOT verified', () => {
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

      const updatedAccount = await context.query.Account.updateOne({
        where: { id: account.id },
        data: accountUpdate,
        query: 'id firstName lastName email verificationHash status { isVerified isBlocked }',
      });

      result = await accountSignInChecks(context, updatedAccount, mockUrlOrigin);
    });

    test('it should call confirmEmailAddressEmail.send', async () => {
      expect(sendConfirmEmailAddressEmailSpy).toHaveBeenCalledTimes(1);
      expect(sendConfirmEmailAddressEmailSpy).toHaveBeenCalledWith(context, variables.urlOrigin, account.id);
    });

    test('it should NOT call sendEmail.accessCodeEmail', async () => {
      expect(accessCodeEmailSpy).toHaveBeenCalledTimes(0);
    });

    test('it should return success=false, accountId and resentVerificationEmail=true', async () => {
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
      sendEmail.accessCodeEmail = jest.fn(() => Promise.reject(mockSendEmailResponse));
    });

    test('should throw an error', async () => {
      try {
        await accountSignInChecks(context, account, mockUrlOrigin);
      } catch (err) {
        expect(accessCodeEmailSpy).toHaveBeenCalledTimes(1);

        const expected = new Error(
          `Validating password or sending email(s) for account sign in (accountSignIn mutation - account checks) ${mockSendEmailResponse}`,
        );

        expect(err).toEqual(expected);
      }
    });
  });
});
