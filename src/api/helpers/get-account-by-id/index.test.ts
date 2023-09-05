import getAccountById from '.';
import accounts from '../../test-helpers/accounts';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import { Account, Context } from '../../types';

describe('helpers/get-account-by-id', () => {
  let context: Context;
  let account: Account;

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    account = await accounts.create({ context });
  });

  it('should return an account/account by ID', async () => {
    const result = await getAccountById(context, account.id);

    expect(result.id).toEqual(account.id);
    expect(result.firstName).toEqual(account.firstName);
    expect(result.lastName).toEqual(account.lastName);
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
        await getAccountById(context, account.id);
      } catch (err) {
        const expected = new Error('Getting account by ID');
        expect(err).toEqual(expected);
      }
    });
  });
});
