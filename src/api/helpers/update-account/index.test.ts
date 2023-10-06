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

  beforeEach(async () => {
    // create a new account
    const accountData = mockAccount;

    account = (await accounts.create({ context, data: accountData })) as Account;
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
});
