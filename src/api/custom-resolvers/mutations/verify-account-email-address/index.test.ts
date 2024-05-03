import crypto from 'crypto';
import verifyAccountEmailAddress from '.';
import { ACCOUNT, FIELD_IDS, DATE_ONE_MINUTE_IN_THE_PAST } from '../../../constants';
import encryptPassword from '../../../helpers/encrypt-password';
import accounts from '../../../test-helpers/accounts';
import accountStatusHelper from '../../../test-helpers/account-status';
import authRetries from '../../../test-helpers/auth-retries';
import { mockAccount } from '../../../test-mocks';
import { Account, Context, VerifyEmailAddressResponse, VerifyEmailAddressVariables } from '../../../types';
import getKeystoneContext from '../../../test-helpers/get-keystone-context';

const {
  EMAIL: { VERIFICATION_EXPIRY: EMAIL_VERIFICATION_EXPIRY },
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
    ACCOUNT: { EMAIL, ID, IS_VERIFIED, VERIFICATION_HASH, VERIFICATION_EXPIRY },
  },
} = FIELD_IDS;

const { status, ...mockAccountUpdate } = mockAccount;

describe('custom-resolvers/verify-account-email-address', () => {
  let context: Context;
  let account: Account;
  let verificationHash: string;
  let result: VerifyEmailAddressResponse;

  const variables = {} as VerifyEmailAddressVariables;

  beforeAll(() => {
    context = getKeystoneContext();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  beforeEach(async () => {
    await authRetries.deleteAll(context);
    await accounts.deleteAll(context);

    /**
     * Create an account that:
     * - is unverified
     * - has a verification hash and expiry
     */
    const mockPassword = String(process.env.MOCK_ACCOUNT_PASSWORD);
    const { salt, hash } = encryptPassword(mockPassword);

    verificationHash = crypto.pbkdf2Sync(mockPassword, salt, ITERATIONS, KEY_LENGTH, DIGEST_ALGORITHM).toString(STRING_TYPE);

    const verificationExpiry = EMAIL_VERIFICATION_EXPIRY();

    const unverifiedAccount = {
      ...mockAccountUpdate,
      salt,
      hash,
      verificationHash,
      verificationExpiry,
    };

    account = await accounts.create({ context, data: unverifiedAccount });

    expect(account.status.isVerified).toEqual(false);

    variables.token = verificationHash;

    result = await verifyAccountEmailAddress({}, variables, context);

    // get the latest account
    account = await accounts.get(context, account.id);
  });

  test('should return success=true with accountId and emailRecipient', () => {
    const expected = {
      success: true,
      accountId: account.id,
      emailRecipient: account[EMAIL],
    };

    expect(result).toEqual(expected);
  });

  test(`should update the account to be ${IS_VERIFIED}=true`, () => {
    expect(account.status[IS_VERIFIED]).toEqual(true);
  });

  test(`should remove ${VERIFICATION_HASH} from the account`, () => {
    expect(account[VERIFICATION_HASH]).toEqual('');
  });

  test(`should nullify ${VERIFICATION_EXPIRY} from the account`, () => {
    expect(account[VERIFICATION_EXPIRY]).toBeNull();
  });

  test('should remove all entries for the account in the AuthenticationRetry table', async () => {
    const retries = await authRetries.findAll(context);

    expect(retries.length).toEqual(0);
  });

  describe(`when the ${VERIFICATION_EXPIRY} has expired`, () => {
    test('it should return success=false and expired=true', async () => {
      const oneMinuteInThePast = DATE_ONE_MINUTE_IN_THE_PAST();

      const accountVerificationExpired = {
        ...mockAccountUpdate,
        verificationHash,
        [VERIFICATION_EXPIRY]: oneMinuteInThePast,
      };

      account = await accounts.create({ context, data: accountVerificationExpired });
      await accountStatusHelper.update(context, account.status.id, { [IS_VERIFIED]: false });
      // get updated account
      account = await accounts.get(context, account.id);

      result = await verifyAccountEmailAddress({}, variables, context);

      const expected = {
        success: false,
        expired: true,
        accountId: account.id,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when an account is already verified', () => {
    test('it should return success=true', async () => {
      account = await accounts.create({ context, data: mockAccountUpdate });
      await accountStatusHelper.update(context, account.status.id, { [IS_VERIFIED]: true });
      // get updated account
      account = await accounts.get(context, account.id);

      result = await verifyAccountEmailAddress({}, variables, context);

      const expected = {
        success: true,
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when no account is found from the provided ${ID}`, () => {
    test('it should return success=false and invalid=true', async () => {
      variables[ID] = 'invalid';

      result = await verifyAccountEmailAddress({}, variables, context);

      const expected = { success: false, invalid: true };

      expect(result).toEqual(expected);
    });
  });

  describe('when no account is found', () => {
    test('it should return success=false and invalid=true', async () => {
      // ensure we have the valid token that was previously created
      variables.token = verificationHash;

      // wipe accounts so an account will not be found.
      await accounts.deleteAll(context);

      result = await verifyAccountEmailAddress({}, variables, context);

      const expected = { success: false, invalid: true };

      expect(result).toEqual(expected);
    });
  });
});
