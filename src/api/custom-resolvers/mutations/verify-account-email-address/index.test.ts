import crypto from 'crypto';
import verifyAccountEmailAddress from '.';
import { ACCOUNT, FIELD_IDS, DATE_ONE_MINUTE_IN_THE_PAST } from '../../../constants';
import encryptPassword from '../../../helpers/encrypt-password';
import accounts from '../../../test-helpers/accounts';
import authRetries from '../../../test-helpers/auth-retries';
import { mockAccount } from '../../../test-mocks';
import { Account, VerifyEmailAddressResponse, VerifyEmailAddressVariables } from '../../../types';
import getKeystoneContext from '../../../test-helpers/get-keystone-context';

const context = getKeystoneContext();

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
    ACCOUNT: { EMAIL, IS_VERIFIED, VERIFICATION_HASH, VERIFICATION_EXPIRY },
  },
} = FIELD_IDS;

describe('custom-resolvers/verify-account-email-address', () => {
  let account: Account;
  let verificationHash: string;
  let result: VerifyEmailAddressResponse;

  const variables = {} as VerifyEmailAddressVariables;

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
      ...mockAccount,
      [IS_VERIFIED]: false,
      salt,
      hash,
      verificationHash,
      verificationExpiry,
    };

    account = await accounts.create({ context, data: unverifiedAccount });

    expect(account.isVerified).toEqual(false);

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
    expect(account[IS_VERIFIED]).toEqual(true);
  });

  test(`should remove ${VERIFICATION_HASH} from the account`, () => {
    expect(account[VERIFICATION_HASH]).toEqual('');
  });

  test(`should nullify ${VERIFICATION_EXPIRY} from the account`, () => {
    expect(account[VERIFICATION_EXPIRY]).toEqual(null);
  });

  test('should remove all entries for the account in the AuthenticationRetry table', async () => {
    const retries = await authRetries.findAll(context);

    expect(retries.length).toEqual(0);
  });

  describe(`when the ${VERIFICATION_EXPIRY} has expired`, () => {
    test('it should return success=false and expired=true', async () => {
      const oneMinuteInThePast = DATE_ONE_MINUTE_IN_THE_PAST();

      const accountVerificationExpired = {
        ...mockAccount,
        verificationHash,
        [VERIFICATION_EXPIRY]: oneMinuteInThePast,
      };

      account = await accounts.create({ context, data: accountVerificationExpired });

      result = await verifyAccountEmailAddress({}, variables, context);

      const expected = {
        success: false,
        expired: true,
        accountId: account.id,
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when no account is found from the provided ${VERIFICATION_HASH}`, () => {
    test('it should return success=false and invalid=true', async () => {
      variables.token = 'invalid';

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
