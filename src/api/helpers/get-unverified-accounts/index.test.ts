import getUnverifiedAccounts from '.';
import { createMultipleAccounts, getKeystoneContext } from '../../test-helpers';
import accounts from '../../test-helpers/accounts';
import accountStatus from '../../test-helpers/account-status';
import { Account, Context } from '../../types';
import { DATE_2_MONTHS_IN_THE_PAST } from '../../constants';

describe('api/helpers/get-unverified-accounts', () => {
  let context: Context;
  let accountArray: Array<Account>;

  const updateData = {
    verificationExpiry: DATE_2_MONTHS_IN_THE_PAST(),
  };

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    accountArray = await createMultipleAccounts(context);
  });

  describe('no unverified accounts', () => {
    it('should return an empty array', async () => {
      const result = await getUnverifiedAccounts(context);

      expect(result).toEqual([]);
    });
  });

  describe('when unverified accounts are present', () => {
    beforeEach(async () => {
      await accounts.update(context, accountArray[1].id, updateData);
      await accounts.update(context, accountArray[3].id, updateData);
    });

    it('should return an array with the 2 unverified accounts', async () => {
      const result = await getUnverifiedAccounts(context);

      const expected = [await accounts.get(context, accountArray[1].id), await accounts.get(context, accountArray[3].id)];

      expect(result).toEqual(expected);
    });
  });

  describe(`when one unverified account already has the isInactive flag set`, () => {
    beforeEach(async () => {
      await accounts.update(context, accountArray[1].id, updateData);
      await accounts.update(context, accountArray[3].id, updateData);
      await accountStatus.update(context, accountArray[3].status.id, { isInactive: true });
    });

    it('should return an array with 1 unverified account', async () => {
      const result = await getUnverifiedAccounts(context);

      expect(result.length).toEqual(1);
    });
  });
});
