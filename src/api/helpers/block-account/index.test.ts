import blockAccount from '.';
import accounts from '../../test-helpers/accounts';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import { mockAccount } from '../../test-mocks';
import { Account, Context } from '../../types';

describe('helpers/block-account', () => {
  let context: Context;
  let account: Account;
  let result: boolean;

  beforeAll(async () => {
    context = getKeystoneContext();

    const unblockedAccount = {
      ...mockAccount,
      isBlocked: false,
    };

    account = await accounts.create({ context, data: unblockedAccount });

    result = await blockAccount(context, account.id);
  });

  test('it should update an account to be blocked', async () => {
    account = await accounts.get(context, account.id);

    expect(account.isBlocked).toEqual(true);
  });

  test('it should return true', async () => {
    expect(result).toEqual(true);
  });

  describe('when an account is NOT updated - invalid ID', () => {
    test('it should throw an error', async () => {
      const invalidId = 'invalidId';

      try {
        await blockAccount(context, invalidId);
      } catch (err) {
        const errorString = String(err);

        expect(errorString.includes('Blocking account')).toEqual(true);
        expect(errorString.includes('cannot update that Account')).toEqual(true);
      }
    });
  });

  describe('when an account is NOT updated - account not found', () => {
    test('it should throw an error', async () => {
      await accounts.deleteAll(context);

      try {
        await blockAccount(context, account.id);
      } catch (err) {
        const errorString = String(err);

        expect(errorString.includes('Blocking account')).toEqual(true);
        expect(errorString.includes('cannot update that Account')).toEqual(true);
      }
    });
  });
});
