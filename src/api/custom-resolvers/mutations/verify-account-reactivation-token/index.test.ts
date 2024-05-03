import crypto from 'crypto';
import verifyAccountReactivationToken from '.';
import createAuthenticationRetryEntry from '../../../helpers/create-authentication-retry-entry';
import { ACCOUNT, FIELD_IDS, DATE_ONE_MINUTE_IN_THE_PAST } from '../../../constants';
import accounts from '../../../test-helpers/accounts';
import accountStatusHelper from '../../../test-helpers/account-status';
import authRetries from '../../../test-helpers/auth-retries';
import { mockAccount } from '../../../test-mocks';
import { Account, Context, SuccessResponse, VerifyAccountReactivationTokenVariables } from '../../../types';
import getKeystoneContext from '../../../test-helpers/get-keystone-context';

const {
  ENCRYPTION: {
    STRING_TYPE,
    PBKDF2: { ITERATIONS, DIGEST_ALGORITHM },
    PASSWORD: {
      PBKDF2: { KEY_LENGTH },
    },
  },
} = ACCOUNT;

const {
  INSURANCE: {
    ACCOUNT: { IS_VERIFIED, IS_BLOCKED, REACTIVATION_HASH, REACTIVATION_EXPIRY },
  },
} = FIELD_IDS;

const { status, ...mockAccountUpdate } = mockAccount;

describe('custom-resolvers/verify-account-reactivation-token', () => {
  let context: Context;
  let account: Account;
  let reactivationHash: string;
  let result: SuccessResponse;

  const variables = {} as VerifyAccountReactivationTokenVariables;

  beforeAll(() => {
    context = getKeystoneContext();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  beforeEach(async () => {
    await accounts.deleteAll(context);

    /**
     * Create an account that:
     * - is unverified
     * - is blocked
     * - has a reactivation hash and expiry
     */
    reactivationHash = crypto.pbkdf2Sync(mockAccount.email, mockAccount.salt, ITERATIONS, KEY_LENGTH, DIGEST_ALGORITHM).toString(STRING_TYPE);

    const reactivationExpiry = ACCOUNT.REACTIVATION_EXPIRY();

    const unverifiedAndBlockedAccount = {
      ...mockAccountUpdate,
      reactivationHash,
      reactivationExpiry,
    };

    account = await accounts.create({ context, data: unverifiedAndBlockedAccount });
    await accountStatusHelper.update(context, account.status.id, { [IS_VERIFIED]: false, [IS_BLOCKED]: true });
    account = await accounts.get(context, account.id);

    expect(account.status.isVerified).toEqual(false);
    expect(account.status.isBlocked).toEqual(true);

    /**
     * Create an authentication entry
     * so that we can assert it gets removed after reactivation
     */
    await createAuthenticationRetryEntry(context, account.id);

    // get the latest retries to ensure we have a retry entry
    const retries = await authRetries.findAll(context);

    expect(retries.length).toEqual(1);

    variables.token = reactivationHash;

    result = await verifyAccountReactivationToken({}, variables, context);

    // get the latest account
    account = await accounts.get(context, account.id);
  });

  test('should return success=true', () => {
    const expected = {
      success: true,
    };

    expect(result).toEqual(expected);
  });

  test(`should update the account to be ${IS_BLOCKED}=false`, () => {
    expect(account.status[IS_BLOCKED]).toEqual(false);
  });

  test(`should update the account to be ${IS_VERIFIED}=true`, () => {
    expect(account.status[IS_VERIFIED]).toEqual(true);
  });

  test(`should remove ${REACTIVATION_HASH} from the account`, () => {
    expect(account[REACTIVATION_HASH]).toEqual('');
  });

  test(`should nullify ${REACTIVATION_EXPIRY} from the account`, () => {
    expect(account[REACTIVATION_EXPIRY]).toBeNull();
  });

  test('should remove all entries for the account in the AuthenticationRetry table', async () => {
    const retries = await authRetries.findAll(context);

    expect(retries.length).toEqual(0);
  });

  describe(`when the ${REACTIVATION_EXPIRY} has expired`, () => {
    test('it should return success=false and expired=true', async () => {
      const oneMinuteInThePast = DATE_ONE_MINUTE_IN_THE_PAST();

      const accountBlockedAndReactivationExpired = {
        ...mockAccountUpdate,
        reactivationHash,
        [REACTIVATION_EXPIRY]: oneMinuteInThePast,
      };

      account = await accounts.create({ context, data: accountBlockedAndReactivationExpired });
      await accountStatusHelper.update(context, account.status.id, { [IS_BLOCKED]: true });
      // get updated account
      account = await accounts.get(context, account.id);

      result = await verifyAccountReactivationToken({}, variables, context);

      const expected = {
        success: false,
        expired: true,
        accountId: account.id,
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when no account is found from the provided ${REACTIVATION_HASH}`, () => {
    test('it should return success=false and invalid=true', async () => {
      variables.token = 'invalid';

      result = await verifyAccountReactivationToken({}, variables, context);

      const expected = { success: false, invalid: true };

      expect(result).toEqual(expected);
    });
  });

  describe('when no account is found', () => {
    test('it should return success=false and invalid=true', async () => {
      // ensure we have the valid token that was previously created
      variables.token = reactivationHash;

      // wipe accounts so an account will not be found.
      await accounts.deleteAll(context);

      result = await verifyAccountReactivationToken({}, variables, context);

      const expected = { success: false, invalid: true };

      expect(result).toEqual(expected);
    });
  });
});
