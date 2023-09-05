import getAccountPasswordResetToken from '.';
import { FIELD_IDS } from '../../../constants';
import accounts from '../../../test-helpers/accounts';
import { mockAccount } from '../../../test-mocks';
import { Account, AddAndGetOtpResponse, Context } from '../../../types';
import getKeystoneContext from '../../../test-helpers/get-keystone-context';

const {
  ACCOUNT: { PASSWORD_RESET_HASH },
} = FIELD_IDS.INSURANCE;

describe('custom-resolvers/get-account-password-reset-token', () => {
  let context: Context;
  let account: Account;

  const variables = {
    email: mockAccount.email,
  };

  let result: AddAndGetOtpResponse;

  beforeAll(() => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    await accounts.deleteAll(context);

    account = await accounts.create({ context });

    result = await getAccountPasswordResetToken({}, variables, context);
  });

  it('should return success=true with token', () => {
    const expected = {
      success: true,
      token: mockAccount[PASSWORD_RESET_HASH],
    };

    expect(result).toEqual(expected);
  });

  describe(`when the account does not have ${PASSWORD_RESET_HASH}`, () => {
    test('it should return success=false', async () => {
      // update the account so it does not have a PASSWORD_RESET_HASH
      await context.query.Account.updateOne({
        where: { id: account.id },
        data: {
          [PASSWORD_RESET_HASH]: '',
        },
      });

      result = await getAccountPasswordResetToken({}, variables, context);

      const expected = { success: false };

      expect(result).toEqual(expected);
    });
  });

  describe('when no account is found', () => {
    test('it should return success=false', async () => {
      // wipe accounts so an account will not be found.
      await accounts.deleteAll(context);

      result = await getAccountPasswordResetToken({}, variables, context);

      const expected = { success: false };

      expect(result).toEqual(expected);
    });
  });
});
