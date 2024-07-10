import accountSignInSendNewCode from '.';
import generate from '../../../helpers/generate-otp';
import getFullNameString from '../../../helpers/get-full-name-string';
import sendEmail from '../../../emails';
import accounts from '../../../test-helpers/accounts';
import { mockOTP, mockSendEmailResponse } from '../../../test-mocks';
import { Account, AccountSignInSendNewCodeVariables, AccountSignInResponse } from '../../../types';
import getKeystoneContext from '../../../test-helpers/get-keystone-context';

const context = getKeystoneContext();

describe('custom-resolvers/account-sign-in-new-code', () => {
  let account: Account;

  jest.mock('../../../emails');
  jest.mock('../../../helpers/generate-otp');

  generate.otp = () => mockOTP;

  let accessCodeEmailSpy = jest.fn();

  afterAll(() => {
    jest.resetAllMocks();
  });

  let result: AccountSignInResponse;

  let variables: AccountSignInSendNewCodeVariables;

  beforeEach(async () => {
    await accounts.deleteAll(context);

    account = await accounts.create({ context });

    jest.resetAllMocks();

    accessCodeEmailSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));

    sendEmail.accessCodeEmail = accessCodeEmailSpy;

    variables = {
      accountId: account.id,
    };

    result = await accountSignInSendNewCode({}, variables, context);

    account = await accounts.get(context, account.id);
  });

  describe('when the provided password is valid', () => {
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

  describe('when no account is found', () => {
    test('it should return success=false', async () => {
      // wipe accounts so an account will not be found.
      await accounts.deleteAll(context);

      result = await accountSignInSendNewCode({}, variables, context);

      const expected = { success: false };

      expect(result).toEqual(expected);
    });
  });

  describe('error handling', () => {
    beforeEach(() => {
      sendEmail.accessCodeEmail = jest.fn(() => Promise.reject(mockSendEmailResponse));
    });

    test('should throw an error', async () => {
      try {
        await accountSignInSendNewCode({}, variables, context);
      } catch (err) {
        expect(accessCodeEmailSpy).toHaveBeenCalledTimes(1);

        const expected = new Error(`Generating and sending new sign in code for account (accountSignInSendNewCode mutation) ${mockSendEmailResponse}`);
        expect(err).toEqual(expected);
      }
    });
  });
});
