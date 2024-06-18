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

const { ENCRYPTION } = ACCOUNT;

const {
  RANDOM_BYTES_SIZE,
  PASSWORD: {
    PBKDF2: { KEY_LENGTH },
  },
} = ENCRYPTION;

describe('custom-resolvers/create-an-account', () => {
  let context: Context;
  let account: Account;
  let createdAccount: Account;

  jest.mock('../../../emails');

  let sendEmailConfirmEmailAddressSpy = jest.fn();
  let sendConfirmEmailAddressEmailSpy = jest.fn();

  const mockPassword = String(process.env.MOCK_ACCOUNT_PASSWORD);

  const variables = {
    urlOrigin: 'https://mock-origin.com',
    firstName: 'a',
    lastName: 'b',
    email: mockAccount.email,
    password: mockPassword,
  };

  beforeAll(() => {
    context = getKeystoneContext();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('when an account with the provided email does NOT already exist', () => {
    beforeEach(async () => {
      jest.resetAllMocks();

      sendEmailConfirmEmailAddressSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));

      sendEmail.confirmEmailAddress = sendEmailConfirmEmailAddressSpy;

      sendConfirmEmailAddressEmailSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));

      confirmEmailAddressEmail.send = sendConfirmEmailAddressEmailSpy;

      await accounts.deleteAll(context);

      // create an account
      account = (await createAnAccount({}, variables, context)) as Account;

      /**
       * Get the fully created account.
       * note: the response only returns some specific fields.
       */
      createdAccount = await accounts.get(context, account.id);
    });

    it('should generate a created account with added salt and hashes', () => {
      expect(createdAccount.firstName).toEqual(variables.firstName);
      expect(createdAccount.lastName).toEqual(variables.lastName);
      expect(createdAccount.email).toEqual(variables.email);
      expect(createdAccount.salt.length).toEqual(RANDOM_BYTES_SIZE * 2);
      expect(createdAccount.hash.length).toEqual(KEY_LENGTH * 2);
      expect(createdAccount.verificationHash.length).toEqual(KEY_LENGTH * 2);
    });

    it('should generate status fields', async () => {
      account = await accounts.get(context, account.id);

      const { status } = account;

      expect(status.isBlocked).toEqual(false);
      expect(status.isVerified).toEqual(false);
      expect(status.isInactive).toEqual(false);
    });

    it('should call sendEmail.confirmEmailAddress', () => {
      const { email, verificationHash, id } = createdAccount;

      const name = getFullNameString(createdAccount);

      expect(sendEmailConfirmEmailAddressSpy).toHaveBeenCalledTimes(1);
      expect(sendEmailConfirmEmailAddressSpy).toHaveBeenCalledWith(email, variables.urlOrigin, name, verificationHash, id);
    });

    it('should generate a verification expiry date', () => {
      const expiry = new Date(createdAccount.verificationExpiry);

      const expiryDay = expiry.getDate();

      const tomorrow = DATE_24_HOURS_FROM_NOW();
      const tomorrowDay = new Date(tomorrow).getDate();

      expect(expiryDay).toEqual(tomorrowDay);
    });

    it('should return the account ID, verification hash and success=true', () => {
      const expected = {
        id: createdAccount.id,
        verificationHash: createdAccount.verificationHash,
        success: true,
      };

      expect(account).toEqual(expected);
    });
  });

  describe('error handling', () => {
    const emailFailureResponse = { ...mockSendEmailResponse, success: false };

    describe('when an account with the provided email already exists, provided password is valid, account is unverified and confirmEmailAddressEmail.send does not return success=true', () => {
      beforeAll(async () => {
        jest.resetAllMocks();

        sendConfirmEmailAddressEmailSpy = jest.fn(() => Promise.resolve(emailFailureResponse));
        confirmEmailAddressEmail.send = sendConfirmEmailAddressEmailSpy;

        sendEmailConfirmEmailAddressSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));
        sendEmail.confirmEmailAddress = sendEmailConfirmEmailAddressSpy;

        await accounts.deleteAll(context);

        account = (await createAnAccount({}, variables, context)) as Account;

        // get the account's status ID.
        const { status } = await accounts.get(context, account.id);

        // update the account to be unverified
        const statusUpdate = {
          isVerified: false,
        };

        await accountStatus.update(context, status.id, statusUpdate);
      });

      test('should throw an error', async () => {
        try {
          await createAnAccount({}, variables, context);
        } catch (err) {
          const expected = new Error(
            `Account creation - creating account Error: Account creation - sending email verification for account creation ${emailFailureResponse}`,
          );
          expect(err).toEqual(expected);
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
        } catch (err) {
          const expected = new Error(
            `Account creation - creating account Error: Account creation - sending email verification for account creation ${emailFailureResponse}`,
          );
          expect(err).toEqual(expected);
        }
      });
    });
  });
});
