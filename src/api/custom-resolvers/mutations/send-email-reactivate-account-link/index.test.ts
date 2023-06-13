import sendEmailReactivateAccountLink from '.';
import getFullNameString from '../../../helpers/get-full-name-string';
import sendEmail from '../../../emails';
import { ACCOUNT } from '../../../constants';
import accounts from '../../../test-helpers/accounts';
import { mockAccount, mockUrlOrigin, mockSendEmailResponse } from '../../../test-mocks';
import { Account, SuccessResponse, AccountSendEmailReactivateLinkVariables } from '../../../types';
import getKeystoneContext from '../../../test-helpers/get-keystone-context';

const context = getKeystoneContext();

const {
  ENCRYPTION: {
    PASSWORD: {
      PBKDF2: { KEY_LENGTH },
    },
  },
} = ACCOUNT;

describe('custom-resolvers/send-email-reactivate-account-link', () => {
  let account: Account;
  let result: SuccessResponse;

  jest.mock('../../../emails');

  let reactivateAccountLinkSpy = jest.fn();

  const variables = {
    urlOrigin: mockUrlOrigin,
  } as AccountSendEmailReactivateLinkVariables;

  afterAll(() => {
    jest.resetAllMocks();
  });

  beforeEach(async () => {
    await accounts.deleteAll(context);

    const blockedAccount = { ...mockAccount, isBlocked: true };

    account = await accounts.create(context, blockedAccount);

    jest.resetAllMocks();

    reactivateAccountLinkSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));

    sendEmail.reactivateAccountLink = reactivateAccountLinkSpy;

    variables.accountId = account.id;

    result = await sendEmailReactivateAccountLink({}, variables, context);

    // get the latest account
    account = await accounts.get(context, account.id);
  });

  it('should return the email response, email and accountId', () => {
    const expected = {
      ...mockSendEmailResponse,
      email: account.email,
      accountId: account.id,
    };
    expect(result).toEqual(expected);
  });

  it('should generate a reactivationHash and add to the account', async () => {
    expect(account.reactivationHash.length).toEqual(KEY_LENGTH * 2);
  });

  it('should generate and add a reactivationExpiry to the account', async () => {
    const now = new Date();

    const tomorrowDay = new Date(now).getDay() + 1;

    const expiry = new Date(account.reactivationExpiry);

    const expiryDay = expiry.getDay();

    expect(expiryDay).toEqual(tomorrowDay);
  });

  test('it should call sendEmail.reactivateAccountLink', () => {
    const { email, reactivationHash } = account;

    const name = getFullNameString(account);

    expect(reactivateAccountLinkSpy).toHaveBeenCalledTimes(1);
    expect(reactivateAccountLinkSpy).toHaveBeenCalledWith(mockUrlOrigin, email, name, reactivationHash);
  });

  describe('when no account is found', () => {
    test('it should return success=false', async () => {
      // wipe accounts so an account will not be found.
      await accounts.deleteAll(context);

      result = await sendEmailReactivateAccountLink({}, variables, context);

      const expected = { success: false };

      expect(result).toEqual(expected);
    });
  });

  describe('error handling', () => {
    beforeEach(() => {
      sendEmail.reactivateAccountLink = jest.fn(() => Promise.reject(mockSendEmailResponse));
    });

    test('should throw an error', async () => {
      try {
        await sendEmailReactivateAccountLink({}, variables, context);
      } catch (err) {
        expect(reactivateAccountLinkSpy).toHaveBeenCalledTimes(1);

        const errMessage = 'Checking account and sending reactivate account email/link (sendEmailReactivateAccountLink mutation)';

        const expected = new Error(`${errMessage} ${mockSendEmailResponse}`);
        expect(err).toEqual(expected);
      }
    });
  });
});
