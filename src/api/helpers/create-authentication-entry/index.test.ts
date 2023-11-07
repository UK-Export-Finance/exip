import createAuthenticationEntry from '.';
import accounts from '../../test-helpers/accounts';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import { mockAccount } from '../../test-mocks';
import { Account, Context } from '../../types';

describe('helpers/create-authentication-entry', () => {
  let context: Context;
  let account: Account;
  let result;

  beforeAll(async () => {
    context = getKeystoneContext();

    account = await accounts.create({ context });
  });

  test('it should create a new entry and return the entry with a timestamp', async () => {
    const authEntry = {
      account: {
        connect: {
          id: account.id,
        },
      },
      salt: mockAccount.salt,
      hash: mockAccount.hash,
    };

    result = await createAuthenticationEntry(context, authEntry);

    expect(result.createdAt).toBeDefined();
    expect(result.hash).toEqual(mockAccount.hash);
    expect(result.salt).toEqual(mockAccount.salt);
  });
});
