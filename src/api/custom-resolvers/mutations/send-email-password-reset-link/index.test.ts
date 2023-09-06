import sendEmailPasswordResetLink from '.';
import createAuthenticationRetryEntry from '../../../helpers/create-authentication-retry-entry';
import getFullNameString from '../../../helpers/get-full-name-string';
import sendEmail from '../../../emails';
import { ACCOUNT } from '../../../constants';
import accounts from '../../../test-helpers/accounts';
import authRetries from '../../../test-helpers/auth-retries';
import { get30minutesFromNow } from '../../../helpers/date';
import { mockAccount, mockUrlOrigin, mockSendEmailResponse } from '../../../test-mocks';
import { Account, Context, SuccessResponse } from '../../../types';
import getKeystoneContext from '../../../test-helpers/get-keystone-context';

const {
  ENCRYPTION: {
    PASSWORD: {
      PBKDF2: { KEY_LENGTH },
    },
  },
  MAX_AUTH_RETRIES,
} = ACCOUNT;

describe('custom-resolvers/send-email-password-reset-link', () => {
  let context: Context;
  let account: Account;
  let result: SuccessResponse;

  jest.mock('../../../emails');

  let passwordResetLinkSpy = jest.fn();

  const variables = {
    urlOrigin: mockUrlOrigin,
    email: mockAccount.email,
  };

  beforeAll(() => {
    context = getKeystoneContext();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  beforeEach(async () => {
    await accounts.deleteAll(context);

    account = await accounts.create({ context });

    jest.resetAllMocks();

    passwordResetLinkSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));

    sendEmail.passwordResetLink = passwordResetLinkSpy;

    result = await sendEmailPasswordResetLink({}, variables, context);

    // get the latest account
    account = await accounts.get(context, account.id);

    expect(account.isBlocked).toEqual(false);
  });

  it('should return the email response', () => {
    expect(result).toEqual(mockSendEmailResponse);
  });

  it('should generate a passwordResetHash and add to the account', async () => {
    expect(account.passwordResetHash.length).toEqual(KEY_LENGTH * 2);
  });

  it('should generate and add a passwordResetExpiry to the account', async () => {
    const now = new Date();

    const nowDay = now.getDate();
    const nowMonth = now.getMonth();
    const nowYear = now.getFullYear();

    const expiry = new Date(account.passwordResetExpiry);

    const expiryDay = expiry.getDate();
    const expiryMonth = expiry.getMonth();
    const expiryYear = expiry.getFullYear();

    expect(expiryDay).toEqual(nowDay);
    expect(expiryMonth).toEqual(nowMonth);
    expect(expiryYear).toEqual(nowYear);

    const expiryMinutes = expiry.getMinutes();

    const expectedMinutes = get30minutesFromNow();

    expect(expiryMinutes).toEqual(expectedMinutes);
  });

  test('it should call sendEmail.passwordResetLink', () => {
    const { email, passwordResetHash } = account;

    const name = getFullNameString(account);

    expect(passwordResetLinkSpy).toHaveBeenCalledTimes(1);
    expect(passwordResetLinkSpy).toHaveBeenCalledWith(mockUrlOrigin, email, name, passwordResetHash);
  });

  it('should create a new entry in the AuthenticationRetry table', async () => {
    // wipe the AuthenticationRetry table so we have a clean slate.
    await authRetries.deleteAll(context);

    let retries = await authRetries.findAll(context);

    expect(retries.length).toEqual(0);

    await sendEmailPasswordResetLink({}, variables, context);

    retries = await authRetries.findAll(context);

    expect(retries.length).toEqual(1);
  });

  describe('when AuthenticationRetry table entry fails', () => {
    test('it should return success=false', async () => {
      // delete the account so the relationship creation will fail
      await context.query.Account.deleteOne({
        where: {
          id: account.id,
        },
      });

      result = await sendEmailPasswordResetLink({}, variables, context);

      const expected = { success: false };

      expect(result).toEqual(expected);
    });
  });

  describe('when no account is found', () => {
    test('it should return success=false', async () => {
      // wipe accounts so an account will not be found.
      await accounts.deleteAll(context);

      result = await sendEmailPasswordResetLink({}, variables, context);

      const expected = { success: false };

      expect(result).toEqual(expected);
    });
  });

  describe(`when the account has ${MAX_AUTH_RETRIES} entries in the AuthenticationRetry table`, () => {
    beforeEach(async () => {
      await authRetries.deleteAll(context);

      // generate an array of promises to create retry entries
      const entriesToCreate = [...Array(MAX_AUTH_RETRIES)].map(async () => createAuthenticationRetryEntry(context, account.id));

      await Promise.all(entriesToCreate);

      result = await sendEmailPasswordResetLink({}, variables, context);
    });

    it('should return success=false, isBlocked=true and accountId', async () => {
      const expected = {
        success: false,
        isBlocked: true,
        accountId: account.id,
      };

      expect(result).toEqual(expected);
    });

    it('should mark the account as isBlocked=true', async () => {
      // get the latest account
      account = await accounts.get(context, account.id);

      expect(account.isBlocked).toEqual(true);
    });
  });

  describe('error handling', () => {
    beforeEach(() => {
      sendEmail.passwordResetLink = jest.fn(() => Promise.reject(mockSendEmailResponse));
    });

    test('should throw an error', async () => {
      try {
        await sendEmailPasswordResetLink({}, variables, context);
      } catch (err) {
        expect(passwordResetLinkSpy).toHaveBeenCalledTimes(1);

        const expected = new Error(`Checking account and sending password reset email (sendEmailPasswordResetLink mutation) ${mockSendEmailResponse}`);
        expect(err).toEqual(expected);
      }
    });
  });
});
