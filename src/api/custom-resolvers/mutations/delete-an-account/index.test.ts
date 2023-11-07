import deleteAnAccount from '.';
import createAuthenticationRetryEntry from '../../../helpers/create-authentication-retry-entry';
import accounts from '../../../test-helpers/accounts';
import authRetries from '../../../test-helpers/auth-retries';
import { mockAccount } from '../../../test-mocks';
import { Account, Context, SuccessResponse } from '../../../types';
import getKeystoneContext from '../../../test-helpers/get-keystone-context';

describe('custom-resolvers/delete-an-account', () => {
  let context: Context;
  let account: Account;
  let result: SuccessResponse;

  const variables = {
    email: mockAccount.email,
  };

  beforeAll(async () => {
    context = getKeystoneContext();

    await accounts.deleteAll(context);

    account = await accounts.create({ context });
  });

  test('it should return success=true', async () => {
    result = await deleteAnAccount({}, variables, context);

    const expected = {
      success: true,
    };

    expect(result).toEqual(expected);
  });

  describe('when an account has authentication retries', () => {
    let retries;

    beforeEach(async () => {
      account = await accounts.create({ context });

      // wipe the table so we have a clean slate.
      await authRetries.deleteAll(context);

      // create new retry entires
      await createAuthenticationRetryEntry(context, account.id);
      await createAuthenticationRetryEntry(context, account.id);

      // get the latest retries to make sure we only have 2 entries
      retries = await authRetries.findAll(context);

      expect(retries.length).toEqual(2);
    });

    test('it should delete the retries', async () => {
      result = await deleteAnAccount({}, variables, context);

      retries = await authRetries.findAll(context);

      expect(retries.length).toEqual(0);
    });
  });

  describe('when an account is not found', () => {
    it('should return success=false', async () => {
      const accountEmailDoesNotExist = String(process.env.GOV_NOTIFY_EMAIL_RECIPIENT_2);

      variables.email = accountEmailDoesNotExist;

      result = await deleteAnAccount({}, variables, context);

      const expected = {
        success: false,
      };

      expect(result).toEqual(expected);
    });
  });
});
