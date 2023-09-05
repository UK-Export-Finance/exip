import { subMinutes } from 'date-fns';
import verifyAccountPasswordResetToken from '.';
import { FIELD_IDS } from '../../../constants';
import accounts from '../../../test-helpers/accounts';
import { mockAccount } from '../../../test-mocks';
import { Account, AddAndGetOtpResponse, Context } from '../../../types';
import getKeystoneContext from '../../../test-helpers/get-keystone-context';

const {
  ACCOUNT: { PASSWORD_RESET_HASH, PASSWORD_RESET_EXPIRY },
} = FIELD_IDS.INSURANCE;

describe('custom-resolvers/verify-account-password-reset-token', () => {
  let context: Context;
  let account: Account;
  let result: AddAndGetOtpResponse;

  const variables = {
    token: mockAccount[PASSWORD_RESET_HASH],
  };

  beforeAll(() => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    await accounts.deleteAll(context);

    account = await accounts.create({ context });

    result = await verifyAccountPasswordResetToken({}, variables, context);
  });

  it('should return success=true', () => {
    const expected = {
      success: true,
    };

    expect(result).toEqual(expected);
  });

  describe(`when the account does not have ${PASSWORD_RESET_HASH}`, () => {
    test('it should return success=false and invalid=true', async () => {
      // update the account so it does not have a PASSWORD_RESET_HASH
      await context.query.Account.updateOne({
        where: { id: account.id },
        data: {
          [PASSWORD_RESET_HASH]: '',
        },
      });

      result = await verifyAccountPasswordResetToken({}, variables, context);

      const expected = {
        success: false,
        invalid: true,
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when the account's ${PASSWORD_RESET_EXPIRY} has expired`, () => {
    test('it should return success=false and expired=true with account ID', async () => {
      const today = new Date();

      const previousTime = subMinutes(today, 6);

      // update the account so PASSWORD_RESET_EXPIRY is expired
      await context.query.Account.updateOne({
        where: { id: account.id },
        data: {
          [PASSWORD_RESET_EXPIRY]: previousTime,
        },
      });

      result = await verifyAccountPasswordResetToken({}, variables, context);

      const expected = {
        expired: true,
        success: false,
        accountId: account.id,
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when no account is found from the provided ${PASSWORD_RESET_HASH}`, () => {
    test('it should return success=false and invalid=true', async () => {
      // update the account so PASSWORD_RESET_HASH has a value
      await context.query.Account.updateOne({
        where: { id: account.id },
        data: {
          [PASSWORD_RESET_HASH]: mockAccount[PASSWORD_RESET_HASH],
        },
      });

      variables.token = 'invalid';

      result = await verifyAccountPasswordResetToken({}, variables, context);

      const expected = { success: false, invalid: true };

      expect(result).toEqual(expected);
    });
  });

  describe('when no account is found', () => {
    test('it should return success=false', async () => {
      // wipe accounts so an account will not be found.
      await accounts.deleteAll(context);

      result = await verifyAccountPasswordResetToken({}, variables, context);

      const expected = {
        success: false,
        invalid: true,
      };

      expect(result).toEqual(expected);
    });
  });
});
