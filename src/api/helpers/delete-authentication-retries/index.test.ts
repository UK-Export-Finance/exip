import deleteAuthenticationRetries from '.';
import accounts from '../../test-helpers/accounts';
import authRetries from '../../test-helpers/auth-retries';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import { Account, Context } from '../../types';

describe('helpers/delete-authentication-retries', () => {
  let context: Context;
  let account: Account;

  afterAll(() => {
    jest.resetAllMocks();
  });

  beforeAll(async () => {
    context = getKeystoneContext();

    // wipe the AuthenticationRetry table so we have a clean slate.
    await authRetries.deleteAll(context);

    account = await accounts.create({ context });

    // create some entries
    const mockEntry = {
      account: {
        connect: {
          id: account.id,
        },
      },
      createdAt: new Date(),
    };

    await context.query.AuthenticationRetry.createMany({
      data: [mockEntry, mockEntry],
    });
  });

  test(`it should wipe the account's retry entires`, async () => {
    // check initial retries count
    let retries = await authRetries.findAll(context);

    expect(retries.length).toEqual(2);

    // call the function
    await deleteAuthenticationRetries(context, account.id);

    // get the latest retries to check they have been deleted
    retries = await authRetries.findAll(context);

    expect(retries.length).toEqual(0);
  });
});
