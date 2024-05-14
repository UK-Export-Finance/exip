import mapAndUpdateUnverifiedAccounts from '.';
import { getKeystoneContext } from '../../test-helpers';
import accounts from '../../test-helpers/accounts';
import { Account, Context } from '../../types';

describe('helpers/map-and-update-unverified-accounts', () => {
  let context: Context;
  let account: Account;

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    account = (await accounts.create({ context })) as Account;
  });

  describe('when an account is passed', () => {
    it('should change the status isInactive flag to true and update updatedAt timestamps', async () => {
      await mapAndUpdateUnverifiedAccounts([account], context);

      const expected = await accounts.get(context, account.id);

      expect(expected.status.isInactive).toEqual(true);
      expect(expected.status.updatedAt).toBeDefined();
      expect(new Date(expected.updatedAt).getTime()).toBeGreaterThan(new Date(account.updatedAt).getTime());
    });
  });
});
