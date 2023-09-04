import getAuthenticationRetriesByAccountId from '.';
import createAuthenticationRetryEntry from '../create-authentication-retry-entry';
import accounts from '../../test-helpers/accounts';
import authRetries from '../../test-helpers/auth-retries';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import { mockAccount } from '../../test-mocks';
import { Account, Context } from '../../types';

describe('helpers/get-authentication-retries-by-account-id', () => {
  let context: Context;
  let account: Account;

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    // wipe the table so we have a clean slate.
    await authRetries.deleteAll(context);

    const unblockedAccount = {
      ...mockAccount,
      isBlocked: false,
    };

    account = await accounts.create({ context, data: unblockedAccount });

    // create some new entries
    await createAuthenticationRetryEntry(context, account.id);
    await createAuthenticationRetryEntry(context, account.id);
  });

  it('should return a auth retries by account ID', async () => {
    const result = await getAuthenticationRetriesByAccountId(context, account.id);

    expect(result.length).toEqual(2);
  });
});
