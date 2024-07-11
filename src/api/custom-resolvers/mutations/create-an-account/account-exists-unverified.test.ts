import createAnAccount from '.';
import sendEmail from '../../../emails';
import confirmEmailAddressEmail from '../../../helpers/send-email-confirm-email-address';
import accounts from '../../../test-helpers/accounts';
import accountStatus from '../../../test-helpers/account-status';
import { mockAccount, mockSendEmailResponse } from '../../../test-mocks';
import { Account, Context } from '../../../types';
import getKeystoneContext from '../../../test-helpers/get-keystone-context';

describe('custom-resolvers/create-an-account - account exists and is unverified', () => {
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

  describe('when an account with the provided email already exists, provided password is valid, account is unverified', () => {
    let result: Account;

    beforeEach(async () => {
      jest.resetAllMocks();

      sendConfirmEmailAddressEmailSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));
      confirmEmailAddressEmail.send = sendConfirmEmailAddressEmailSpy;

      sendEmailConfirmEmailAddressSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));
      sendEmail.confirmEmailAddress = sendEmailConfirmEmailAddressSpy;

      await accounts.deleteAll(context);

      account = (await createAnAccount({}, variables, context)) as Account;

      // get the account's status ID.
      const { status } = await accounts.get(context, account.id);

      const statusUpdate = {
        isVerified: false,
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

      // attempt to create account with the same email
      result = (await createAnAccount({}, variables, context)) as Account;

      /**
       * Get the fully created account.
       * note: the response only returns some specific fields.
       */
      createdAccount = await accounts.get(context, account.id);
    });

    it('should call confirmEmailAddressEmail.send', () => {
      expect(sendConfirmEmailAddressEmailSpy).toHaveBeenCalledTimes(1);

      expect(sendConfirmEmailAddressEmailSpy).toHaveBeenCalledWith(context, variables.urlOrigin, account.id);
    });

    it('should NOT call sendEmail.confirmEmailAddress', () => {
      expect(sendEmailConfirmEmailAddressSpy).toHaveBeenCalledTimes(0);
    });

    it('should return the account ID, success=true, alreadyExists=true, isVerified=true,', () => {
      const expected = {
        id: createdAccount.id,
        success: true,
        alreadyExists: true,
        isVerified: false,
      };

      expect(result).toEqual(expected);
    });

    it('should NOT create a new account', async () => {
      const allAccounts = await context.query.Account.findMany();

      // should only have the first created account
      expect(allAccounts.length).toEqual(1);
    });
  });
});
