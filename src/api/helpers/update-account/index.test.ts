import update from '.';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import accounts from '../../test-helpers/accounts';
import { mockAccount } from '../../test-mocks';
import { Account, Context } from '../../types';

describe('helpers/update-account', () => {
  let context: Context;
  let account: Account;

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  const { status: accountStatusData, ...mockAccountUpdate } = mockAccount;

  beforeEach(async () => {
    // create a new account
    account = (await accounts.create({ context, data: mockAccountUpdate })) as Account;
  });

  it('should update the account', async () => {
    const accountUpdate = {
      firstName: 'updated first name',
      lastName: 'updated last name',
    };
    await update.account(context, account.id, accountUpdate);

    const latestAccount = (await context.query.Account.findOne({
      where: {
        id: account.id,
      },
      query: 'firstName lastName',
    })) as Account;

    expect(latestAccount.firstName).not.toEqual(mockAccount.firstName);
    expect(latestAccount.lastName).not.toEqual(mockAccount.lastName);

    expect(latestAccount.firstName).toEqual(accountUpdate.firstName);
    expect(latestAccount.lastName).toEqual(accountUpdate.lastName);
  });

  describe('when an account is not found', () => {
    beforeEach(async () => {
      // delete the account so it will not be found
      await context.query.Account.deleteOne({
        where: { id: account.id },
      });
    });

    it('should throw an error', async () => {
      try {
        await update.account(context, account.id, {});
      } catch (err) {
        const expectedKeystoneError = 'Access denied: You cannot update that Account - it may not exist';

        const expected = new Error(`Updating account ${expectedKeystoneError}`);

        expect(err).toEqual(expected);
      }
    });
  });

  it('should update the accountStatus', async () => {
    const accountUpdate = {
      isVerified: true,
      isBlocked: true,
    };

    await update.accountStatus(context, account.status.id, accountUpdate);

    account = await accounts.get(context, account.id);

    const { status } = account;

    expect(status.isBlocked).toEqual(true);
    expect(status.isVerified).toEqual(true);
    expect(status.isInactive).toEqual(false);
    expect(new Date(status.updatedAt).getHours()).toEqual(new Date().getHours());
    expect(new Date(status.updatedAt).getMinutes()).toEqual(new Date().getMinutes());
  });

  describe('when an accountStatus is not found', () => {
    beforeEach(async () => {
      // delete the account so it will not be found
      await context.query.AccountStatus.deleteOne({
        where: { id: account.status.id },
      });
    });

    it('should throw an error', async () => {
      const expectedKeystoneError = 'Access denied: You cannot update that AccountStatus - it may not exist';

      await expect(update.accountStatus(context, account.status.id, {})).rejects.toThrow(new Error(`Updating account status ${expectedKeystoneError}`));
    });
  });
});
