import sendEmailReactivateAccountLinkHelper from '.';
import getFullNameString from '../get-full-name-string';
import sendEmail from '../../emails';
import { ACCOUNT, DATE_24_HOURS_FROM_NOW } from '../../constants';
import accounts from '../../test-helpers/accounts';
import accountStatus from '../../test-helpers/account-status';
import { mockAccount, mockUrlOrigin, mockSendEmailResponse } from '../../test-mocks';
import { Account, Context, SuccessResponse, AccountSendEmailReactivateLinkVariables } from '../../types';
import getKeystoneContext from '../../test-helpers/get-keystone-context';

const {
  ENCRYPTION: {
    PASSWORD: {
      PBKDF2: { KEY_LENGTH },
    },
  },
} = ACCOUNT;

const { status, ...mockAccountUpdate } = mockAccount;

describe('helpers/send-email-reactivate-account-link', () => {
  let context: Context;
  let account: Account;
  let result: SuccessResponse;

  jest.mock('../../emails');

  let reactivateAccountLinkSpy = jest.fn();

  const variables = {
    urlOrigin: mockUrlOrigin,
  } as AccountSendEmailReactivateLinkVariables;

  beforeAll(() => {
    context = getKeystoneContext();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  beforeEach(async () => {
    await accounts.deleteAll(context);

    const blockedAccount = { isBlocked: true };

    account = await accounts.create({ context, data: mockAccountUpdate });
    await accountStatus.update(context, account.status.id, blockedAccount);

    jest.resetAllMocks();

    reactivateAccountLinkSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));

    sendEmail.reactivateAccountLink = reactivateAccountLinkSpy;

    variables.accountId = account.id;

    result = await sendEmailReactivateAccountLinkHelper.send(variables, context);

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
    const tomorrow = DATE_24_HOURS_FROM_NOW();
    const tomorrowDay = new Date(tomorrow).getDate();

    const expiry = new Date(account.reactivationExpiry);

    const expiryDay = new Date(expiry).getDate();

    expect(expiryDay).toEqual(tomorrowDay);
  });

  it('should call sendEmail.reactivateAccountLink', () => {
    const { email, reactivationHash } = account;

    const name = getFullNameString(account);

    expect(reactivateAccountLinkSpy).toHaveBeenCalledTimes(1);
    expect(reactivateAccountLinkSpy).toHaveBeenCalledWith(mockUrlOrigin, email, name, reactivationHash);
  });

  describe('when no account is found', () => {
    it('should return success=false', async () => {
      // wipe accounts so an account will not be found.
      await accounts.deleteAll(context);

      result = await sendEmailReactivateAccountLinkHelper.send(variables, context);

      const expected = { success: false };

      expect(result).toEqual(expected);
    });
  });

  describe('error handling', () => {
    it('should throw an error', async () => {
      await expect(sendEmailReactivateAccountLinkHelper.send()).rejects.toThrow(
        'Checking account and sending reactivate account email/link (sendEmailReactivateAccountLink helper)',
      );
    });
  });
});
