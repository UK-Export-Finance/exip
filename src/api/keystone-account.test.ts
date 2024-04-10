import accounts from './test-helpers/accounts';
import { Account, Context } from './types';

describe('Keystone - Account', () => {
  let context: Context;
  let account: Account;

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
