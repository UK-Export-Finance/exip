import accounts from './test-helpers/accounts';
import getKeystoneContext from './test-helpers/get-keystone-context';
import { mockAccount } from './test-mocks';
import { Account, Context } from './types';

describe('Keystone - Account', () => {
  let context: Context;
  let account: Account;

  describe('create', () => {
    beforeAll(async () => {
      context = getKeystoneContext();

      await accounts.create({ context });
    });

    describe('when an account already exists with the provided email', () => {
      test('it should not create the account', async () => {
        const response = (await accounts.create({ context, data: mockAccount, deleteAccounts: false })) as Account;

        expect(response.id).toBeUndefined();
        expect(response.email).toBeUndefined();

        const allAccounts = await context.query.Account.findMany();

        expect(allAccounts.length).toEqual(1);
      });
    });
  });

  describe('update', () => {
    let updatedAccount: Account;

    const accountUpdate = { firstName: 'Updated' };

    beforeAll(async () => {
      account = (await accounts.create({ context })) as Account;

      updatedAccount = (await context.query.Account.updateOne({
        where: { id: account.id },
        data: accountUpdate,
        query: 'id createdAt updatedAt firstName lastName email salt hash isVerified verificationHash verificationExpiry',
      })) as Account;
    });

    test('it should update the provided fields', () => {
      expect(updatedAccount.firstName).toEqual(accountUpdate.firstName);
    });

    test('it should update updatedAt', () => {
      expect(updatedAccount.updatedAt).not.toEqual(account.createdAt);
    });
  });
});
