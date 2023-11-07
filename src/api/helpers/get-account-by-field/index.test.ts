import getAccountByField from '.';
import accounts from '../../test-helpers/accounts';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import { mockAccount } from '../../test-mocks';
import { Account, Context } from '../../types';

describe('helpers/get-account-by-field', () => {
  let context: Context;
  let account: Account;

  const field = 'firstName';
  const value = mockAccount.firstName;

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    await accounts.deleteAll(context);

    account = await accounts.create({ context });
  });

  it('should return an account by ID', async () => {
    const result = (await getAccountByField(context, field, value)) as Account;

    expect(result.id).toEqual(account.id);
    expect(result.firstName).toEqual(account.firstName);
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
        await getAccountByField(context, field, value);
      } catch (err) {
        const errorMessage = 'Getting account by field/value';

        const newError = new Error(errorMessage);

        const expected = new Error(`${errorMessage} ${newError}`);
        expect(err).toEqual(expected);
      }
    });
  });
});
