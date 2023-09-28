import createAuthenticationRetryEntry from '.';
import accounts from '../../test-helpers/accounts';
import authRetries from '../../test-helpers/auth-retries';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import { Account, Context } from '../../types';

describe('helpers/create-authentication-retry-entry', () => {
  let context: Context;
  let account: Account;

  beforeAll(async () => {
    context = getKeystoneContext();

    account = await accounts.create({ context });

    // wipe the AuthenticationRetry table so we have a clean slate.
    await authRetries.deleteAll(context);
  });

  afterAll(async () => {
    await authRetries.deleteAll(context);
  });

  it('should create a new AuthenticationRetry entry associated with the provided account ID', async () => {
    await createAuthenticationRetryEntry(context, account.id);

    const entries = await context.db.AuthenticationRetry.findMany({
      where: {
        account: {
          every: {
            id: { equals: account.id },
          },
        },
      },
    });

    expect(entries.length).toEqual(1);

    expect(entries[0].createdAt).toBeDefined();
  });

  describe('when an entry has already been created with the provided account ID', () => {
    it('should create an additional AuthenticationRetry entry associated with the provided account ID', async () => {
      await createAuthenticationRetryEntry(context, account.id);

      const entries = await context.db.AuthenticationRetry.findMany({
        where: {
          account: {
            every: {
              id: { equals: account.id },
            },
          },
        },
      });

      expect(entries.length).toEqual(2);
    });
  });

  it('should return success=true', async () => {
    const result = await createAuthenticationRetryEntry(context, account.id);

    const expected = {
      success: true,
    };

    expect(result).toEqual(expected);
  });

  describe('when the entry is not saved', () => {
    beforeEach(async () => {
      // delete the account so the relationship creation will fail
      await context.query.Account.deleteOne({
        where: { id: account.id },
      });
    });

    it('should throw an error', async () => {
      try {
        await createAuthenticationRetryEntry(context, account.id);
      } catch (err) {
        const expectedErr = 'An error occurred while resolving relationship fields';

        expect(String(err).includes(expectedErr)).toEqual(true);
      }
    });
  });
});
