import createAnAccount from '.';
import { ACCOUNT } from '../../../constants';
import sendEmail from '../../../emails';
import confirmEmailAddressEmail from '../../../helpers/send-email-confirm-email-address';
import accounts from '../../../test-helpers/accounts';
import accountStatus from '../../../test-helpers/account-status';
import { mockAccount, mockSendEmailResponse } from '../../../test-mocks';
import { Account, Context } from '../../../types';
import getKeystoneContext from '../../../test-helpers/get-keystone-context';
import sendEmailReactivateAccountLinkHelper from '../../../helpers/send-email-reactivate-account-link';
import crypto from 'crypto';

const { ENCRYPTION } = ACCOUNT;

const {
  PASSWORD: {
    PBKDF2: { KEY_LENGTH },
  },
  STRING_TYPE,
  PBKDF2: { ITERATIONS, DIGEST_ALGORITHM },
} = ENCRYPTION;

describe('custom-resolvers/create-an-account - account exists and blocked', () => {
  let context: Context;
  let account: Account;
  let createdAccount: Account;

  jest.mock('../../../emails');

  let sendEmailConfirmEmailAddressSpy = jest.fn();
  let sendConfirmEmailAddressEmailSpy = jest.fn();
  let reactivateAccountLinkSpy = jest.fn();
  let sendEmailReactivateAccountLinkSpy = jest.fn();

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

  describe('when an account with the provided email already exists, provided password is valid, account is blocked', () => {
    let result: Account;

    beforeEach(async () => {
      jest.resetAllMocks();

      sendEmailConfirmEmailAddressSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));
      sendEmail.confirmEmailAddress = sendEmailConfirmEmailAddressSpy;

      confirmEmailAddressEmail.send = sendConfirmEmailAddressEmailSpy;

      await accounts.deleteAll(context);

      account = (await createAnAccount({}, variables, context)) as Account;

      // get the account's status ID.
      const { status } = await accounts.get(context, account.id);

      // update the account to be verified
      const statusUpdate = {
        isBlocked: true,
      };

      await accountStatus.update(context, status.id, statusUpdate);

      /**
       * Reset the mocks.
       * In these tests, "Create account" is called twice:
       * First time: to create an existing account.
       * Second time: to test calling this when an account already exists.
       */
      jest.resetAllMocks();

      sendConfirmEmailAddressEmailSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));
      confirmEmailAddressEmail.send = sendConfirmEmailAddressEmailSpy;

      sendEmailConfirmEmailAddressSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));
      sendEmail.confirmEmailAddress = sendEmailConfirmEmailAddressSpy;

      reactivateAccountLinkSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));
      sendEmail.reactivateAccountLink = reactivateAccountLinkSpy;

      // attempt to create account with the same email
      result = (await createAnAccount({}, variables, context)) as Account;

      /**
       * Get the fully created account.
       * note: the response only returns some specific fields.
       */
      createdAccount = await accounts.get(context, account.id);
    });

    it('should call confirmEmailAddressEmail.send', () => {
      expect(reactivateAccountLinkSpy).toHaveBeenCalledTimes(1);

      const reactivationHash = crypto.pbkdf2Sync(variables.email, createdAccount.salt, ITERATIONS, KEY_LENGTH, DIGEST_ALGORITHM).toString(STRING_TYPE);

      expect(reactivateAccountLinkSpy).toHaveBeenCalledWith(
        variables.urlOrigin,
        variables.email,
        `${variables.firstName} ${variables.lastName}`,
        reactivationHash,
      );
    });

    it('should NOT call sendEmail.confirmEmailAddress', () => {
      expect(sendEmailConfirmEmailAddressSpy).toHaveBeenCalledTimes(0);
    });

    it('should return the account ID, success=true, alreadyExists=true, isVerified=false and isBlocked=true', () => {
      const expected = {
        id: createdAccount.id,
        success: true,
        alreadyExists: true,
        isVerified: false,
        isBlocked: true,
      };

      expect(result).toEqual(expected);
    });

    it('should NOT create a new account', async () => {
      const allAccounts = await context.query.Account.findMany();

      // should only have the first created account
      expect(allAccounts.length).toEqual(1);
    });
  });

  describe('when sendEmailReactivateAccountLinkHelper.send does not return success=true', () => {
    let result: Account;

    beforeEach(async () => {
      jest.resetAllMocks();

      sendEmailConfirmEmailAddressSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));
      sendEmail.confirmEmailAddress = sendEmailConfirmEmailAddressSpy;

      confirmEmailAddressEmail.send = sendConfirmEmailAddressEmailSpy;

      await accounts.deleteAll(context);

      account = (await createAnAccount({}, variables, context)) as Account;

      // get the account's status ID.
      const { status } = await accounts.get(context, account.id);

      // update the account to be verified
      const statusUpdate = {
        isBlocked: true,
      };

      await accountStatus.update(context, status.id, statusUpdate);

      /**
       * Reset the mocks.
       * In these tests, "Create account" is called twice:
       * First time: to create an existing account.
       * Second time: to test calling this when an account already exists.
       */
      jest.resetAllMocks();

      sendConfirmEmailAddressEmailSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));
      confirmEmailAddressEmail.send = sendConfirmEmailAddressEmailSpy;

      sendEmailReactivateAccountLinkSpy = jest.fn(() => Promise.resolve({ success: false }));
      sendEmailReactivateAccountLinkHelper.send = sendEmailReactivateAccountLinkSpy;

      // attempt to create account with the same email
      result = (await createAnAccount({}, variables, context)) as Account;

      /**
       * Get the fully created account.
       * note: the response only returns some specific fields.
       */
      createdAccount = await accounts.get(context, account.id);
    });

    it('should return the account ID, success=false, alreadyExists=true', () => {
      const expected = {
        success: false,
        alreadyExists: true,
      };

      expect(result).toEqual(expected);
    });

    it('should NOT create a new account', async () => {
      const allAccounts = await context.query.Account.findMany();

      // should only have the first created account
      expect(allAccounts.length).toEqual(1);
    });
  });

  describe('when sendEmailReactivateAccountLinkHelper.send errors', () => {
    const mockError = 'mock error';

    beforeEach(async () => {
      jest.resetAllMocks();

      sendEmailConfirmEmailAddressSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));
      sendEmail.confirmEmailAddress = sendEmailConfirmEmailAddressSpy;

      confirmEmailAddressEmail.send = sendConfirmEmailAddressEmailSpy;

      await accounts.deleteAll(context);

      account = (await createAnAccount({}, variables, context)) as Account;

      // get the account's status ID.
      const { status } = await accounts.get(context, account.id);

      // update the account to be verified
      const statusUpdate = {
        isBlocked: true,
      };

      await accountStatus.update(context, status.id, statusUpdate);

      /**
       * Reset the mocks.
       * In these tests, "Create account" is called twice:
       * First time: to create an existing account.
       * Second time: to test calling this when an account already exists.
       */
      jest.resetAllMocks();

      sendConfirmEmailAddressEmailSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));
      confirmEmailAddressEmail.send = sendConfirmEmailAddressEmailSpy;

      sendEmailReactivateAccountLinkSpy = jest.fn(() => Promise.reject(new Error(mockError)));
      sendEmailReactivateAccountLinkHelper.send = sendEmailReactivateAccountLinkSpy;
    });

    it('should throw an error', async () => {
      await expect(createAnAccount({}, variables, context)).rejects.toThrow('Account creation - creating account');
    });
  });
});
