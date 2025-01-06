import updateUnverifiedAccounts from '.';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import { DATE_2_MONTHS_IN_THE_PAST } from '../../constants';
import accounts from '../../test-helpers/accounts';
import { Account, Context } from '../../types';

describe('helpers/update-unverified-accounts', () => {
  let context: Context;
  let account: Account;

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    account = (await accounts.create({ context })) as Account;

    account = await accounts.update(context, account.id, { verificationExpiry: DATE_2_MONTHS_IN_THE_PAST() });
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe(`successfully updates unverified accounts' "isInactive" status to true`, () => {
    it('should return success as true', async () => {
      const { success } = await updateUnverifiedAccounts(context);

      expect(success).toEqual(true);
    });

    it(`should set the accountStatus' "isInactive" to true and update updatedAt timestamps`, async () => {
      await updateUnverifiedAccounts(context);

      const expected = await accounts.get(context, account.id);

      expect(expected.status.isInactive).toEqual(true);
      expect(expected.status.updatedAt).toBeDefined();
      expect(new Date(expected.updatedAt).getTime()).toBeGreaterThan(new Date(account.updatedAt).getTime());
    });
  });

  describe('when an error occurs whilst getting and updating unverified accounts', () => {
    it('should throw an error', async () => {
      await expect(updateUnverifiedAccounts()).rejects.toThrow('Error getting and updating unverified accounts');
    });
  });
});
