import sendEmailReactivateAccountLink from '.';
import sendEmailReactivateAccountLinkHelper from '../../../helpers/send-email-reactivate-account-link';
import accounts from '../../../test-helpers/accounts';
import accountStatus from '../../../test-helpers/account-status';
import { mockAccount, mockUrlOrigin, mockSendEmailResponse } from '../../../test-mocks';
import { Account, Context, SuccessResponse, AccountSendEmailReactivateLinkVariables } from '../../../types';
import getKeystoneContext from '../../../test-helpers/get-keystone-context';

const { status, ...mockAccountUpdate } = mockAccount;

describe('custom-resolvers/send-email-reactivate-account-link', () => {
  let context: Context;
  let account: Account;
  let result: SuccessResponse;

  jest.mock('../../../helpers/send-email-reactivate-account-link');

  let reactivateAccountLinkSpy = jest.fn();

  const variables = {
    urlOrigin: mockUrlOrigin,
  } as AccountSendEmailReactivateLinkVariables;

  const sendEmailReactivateAccountLinkResponse = {
    ...mockSendEmailResponse,
    email: mockAccount.email,
    accountId: mockAccount.id,
  };

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

    reactivateAccountLinkSpy = jest.fn(() => Promise.resolve(sendEmailReactivateAccountLinkResponse));

    sendEmailReactivateAccountLinkHelper.send = reactivateAccountLinkSpy;

    variables.accountId = account.id;

    result = await sendEmailReactivateAccountLink({}, variables, context);

    // get the latest account
    account = await accounts.get(context, account.id);
  });

  it('should return the value of sendEmailReactivateAccountLinkHelper.send', () => {
    expect(result).toEqual(sendEmailReactivateAccountLinkResponse);
  });

  describe('when sendEmailReactivateAccountLinkHelper.send errors', () => {
    beforeEach(() => {
      sendEmailReactivateAccountLinkHelper.send = jest.fn(() => Promise.reject());
    });

    it('should throw an error', async () => {
      await expect(sendEmailReactivateAccountLink({}, variables, context)).rejects.toThrow(
        'Checking account and sending reactivate account email/link (sendEmailReactivateAccountLink mutation)',
      );
    });
  });
});
