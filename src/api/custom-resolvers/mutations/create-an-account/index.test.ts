import 'dotenv/config';
import createAnAccount from '.';
import { ACCOUNT, DATE_24_HOURS_FROM_NOW } from '../../../constants';
import getFullNameString from '../../../helpers/get-full-name-string';
import sendEmail from '../../../emails';
import confirmEmailAddressEmail from '../../../helpers/send-email-confirm-email-address';
import accounts from '../../../test-helpers/accounts';
import accountStatus from '../../../test-helpers/account-status';
import { mockAccount, mockSendEmailResponse } from '../../../test-mocks';
import { Account, Context } from '../../../types';
import getKeystoneContext from '../../../test-helpers/get-keystone-context';

const originalEnv = { ...process.env };

const { ENCRYPTION } = ACCOUNT;

const {
  RANDOM_BYTES_SIZE,
  PASSWORD: {
    PBKDF2: { KEY_LENGTH },
  },
} = ENCRYPTION;

describe('custom-resolvers/create-an-account', () => {
  let context: Context;
  let createdAccount: Account;

  jest.mock('../../../emails');

  let consoleSpy = jest.fn();
  let sendEmailConfirmEmailAddressSpy = jest.fn();
  let sendConfirmEmailAddressEmailSpy = jest.fn();

  const mockPassword = String(process.env.MOCK_ACCOUNT_PASSWORD);

  const variables = {
    urlOrigin: 'https://mock-origin.com',
    firstName: mockAccount.firstName,
    lastName: mockAccount.lastName,
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

  const setupTests = async () => {
    jest.resetAllMocks();

    sendEmailConfirmEmailAddressSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));

    sendEmail.confirmEmailAddress = sendEmailConfirmEmailAddressSpy;

    sendConfirmEmailAddressEmailSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));

    confirmEmailAddressEmail.send = sendConfirmEmailAddressEmailSpy;

    await accounts.deleteAll(context);
  };

  describe('when an account with the provided email does NOT already exist', () => {
    beforeAll(() => {
      process.env.NODE_ENV = 'not-development';
    });

    beforeEach(async () => {
      jest.resetAllMocks();

      await setupTests();

      createdAccount = await createAnAccount({}, variables, context);
    });

    it('should generate a created account with added salt and hashes', async () => {
      const newAccount = await accounts.get(context, createdAccount.id);

      expect(newAccount.firstName).toEqual(variables.firstName);
      expect(newAccount.lastName).toEqual(variables.lastName);
      expect(newAccount.email).toEqual(variables.email);
      expect(newAccount.salt.length).toEqual(RANDOM_BYTES_SIZE * 2);
      expect(newAccount.hash.length).toEqual(KEY_LENGTH * 2);
      expect(newAccount.verificationHash.length).toEqual(KEY_LENGTH * 2);
    });

    it('should generate a verification expiry date', async () => {
      const newAccount = await accounts.get(context, createdAccount.id);

      const expiry = new Date(newAccount.verificationExpiry);

      const expiryDay = expiry.getDate();

      const tomorrow = DATE_24_HOURS_FROM_NOW();
      const tomorrowDay = new Date(tomorrow).getDate();

      expect(expiryDay).toEqual(tomorrowDay);
    });

    it('should generate status fields', async () => {
      const { status } = await accounts.get(context, createdAccount.id);

      expect(status.isBlocked).toEqual(false);
      expect(status.isVerified).toEqual(false);
      expect(status.isInactive).toEqual(false);
    });

    describe('when NODE_ENV is `development`', () => {
      beforeAll(() => {
        process.env.NODE_ENV = 'development';
      });

      beforeEach(async () => {
        jest.resetAllMocks();

        console.info = consoleSpy;

        await setupTests();
      });

      it('should NOT call sendEmail.confirmEmailAddress', async () => {
        await createAnAccount({}, variables, context);

        expect(sendEmailConfirmEmailAddressSpy).toHaveBeenCalledTimes(0);
      });

      it('should call console.info 13 times', async () => {
        await createAnAccount({}, variables, context);

        expect(consoleSpy).toHaveBeenCalledTimes(13);
      });

      it('should log out a verification URL', async () => {
        const { verificationHash, id } = await createAnAccount({}, variables, context);

        const flattenedSpys = consoleSpy.mock.calls.flat();

        const assertion1 = flattenedSpys.includes(`✅ Account creation (dev environment only) - mimicking sending verification link via email \n%s`);
        const assertion2 = flattenedSpys.includes(`${variables.urlOrigin}/apply/create-account/verify-email?token=${verificationHash}&id=${id}`);

        expect(assertion1).toEqual(true);
        expect(assertion2).toEqual(true);
      });

      it('should return the account ID, verification hash and success=true', async () => {
        const account = await createAnAccount({}, variables, context);

        const expected = {
          id: account.id,
          verificationHash: account.verificationHash,
          success: true,
        };

        expect(account).toEqual(expected);
      });
    });

    describe('when NODE_ENV is NOT `development`', () => {
      consoleSpy = jest.fn();

      beforeAll(() => {
        process.env.NODE_ENV = 'not-development';
      });

      beforeEach(async () => {
        jest.resetAllMocks();

        console.info = consoleSpy;

        await setupTests();
      });

      it('should call sendEmail.confirmEmailAddress', async () => {
        createdAccount = await createAnAccount({}, variables, context);

        const { email } = mockAccount;

        const name = getFullNameString(mockAccount);

        expect(sendEmailConfirmEmailAddressSpy).toHaveBeenCalledTimes(1);
        expect(sendEmailConfirmEmailAddressSpy).toHaveBeenCalledWith(email, variables.urlOrigin, name, createdAccount.verificationHash, createdAccount.id);
      });

      it('should NOT log out a verification URL', async () => {
        await createAnAccount({}, variables, context);

        const flattenedSpys = consoleSpy.mock.calls.flat();

        const assertion = flattenedSpys.includes('(dev environment only) - mimicking');

        expect(assertion).toEqual(false);
      });

      it('should return the account ID, verification hash and success=true', async () => {
        createdAccount = await createAnAccount({}, variables, context);

        const newAccount = await accounts.get(context, createdAccount.id);

        const expected = {
          id: newAccount.id,
          verificationHash: newAccount.verificationHash,
          success: true,
        };

        expect(createdAccount).toEqual(expected);
      });
    });
  });

  describe('error handling', () => {
    const emailFailureResponse = { ...mockSendEmailResponse, success: false };

    describe('when an account with the provided email already exists, provided password is valid, account is unverified and confirmEmailAddressEmail.send does not return success=true', () => {
      beforeAll(async () => {
        await setupTests();

        createdAccount = await createAnAccount({}, variables, context);

        // get the account's status ID.
        const { status } = await accounts.get(context, createdAccount.id);

        // update the account to be unverified
        const statusUpdate = {
          isVerified: false,
        };

        await accountStatus.update(context, status.id, statusUpdate);
      });

      test('should throw an error', async () => {
        try {
          await createAnAccount({}, variables, context);
        } catch (error) {
          const expected = new Error(
            `Account creation - creating account Error: Account creation - sending email verification for account creation ${emailFailureResponse}`,
          );
          expect(error).toEqual(expected);
        }
      });
    });

    describe('when an account with the provided email does NOT already exist and sendEmail.confirmEmailAddress does not return success=true', () => {
      beforeAll(async () => {
        await accounts.deleteAll(context);

        sendEmail.confirmEmailAddress = jest.fn(() => Promise.resolve(emailFailureResponse));
      });

      test('should throw an error', async () => {
        try {
          await createAnAccount({}, variables, context);
        } catch (error) {
          const expected = new Error(
            `Account creation - creating account Error: Account creation - sending email verification for account creation ${emailFailureResponse}`,
          );
          expect(error).toEqual(expected);
        }
      });
    });
  });
});
