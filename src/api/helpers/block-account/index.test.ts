import blockAccount from '.';
import accounts from '../../test-helpers/accounts';
import accountStatusHelper from '../../test-helpers/account-status';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import { mockAccount, mockInvalidId } from '../../test-mocks';
import { Account, Context } from '../../types';

const { status, ...mockAccountUpdate } = mockAccount;

describe('helpers/block-account', () => {
  let context: Context;
  let account: Account;
  let result: boolean;

  beforeAll(async () => {
    context = getKeystoneContext();

    account = await accounts.create({ context, data: mockAccountUpdate });
    await accountStatusHelper.update(context, account.status.id, { isBlocked: false });
    // get updated account
    account = await accounts.get(context, account.id);

    result = await blockAccount(context, account.status.id);
  });

  test('it should update an account to be blocked', async () => {
    account = await accounts.get(context, account.id);

    expect(account.status.isBlocked).toEqual(true);
  });

  test('it should return true', async () => {
    expect(result).toEqual(true);
  });

  describe('when an account is NOT updated - invalid ID', () => {
    test('it should throw an error', async () => {
      try {
        await blockAccount(context, mockInvalidId);
      } catch (error) {
        const errorString = String(error);

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
      } catch (error) {
        const errorString = String(error);

        expect(errorString.includes('Blocking account')).toEqual(true);
        expect(errorString.includes('cannot update that Account')).toEqual(true);
      }
    });
  });
});
