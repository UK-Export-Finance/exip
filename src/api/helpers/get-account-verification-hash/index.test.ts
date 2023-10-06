import generateAccountVerificationHash from '.';
import { ACCOUNT, DATE_24_HOURS_FROM_NOW } from '../../constants';
import accounts from '../../test-helpers/accounts';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import { Account, AccountVerification, Context } from '../../types';

const { ENCRYPTION } = ACCOUNT;

const {
  PASSWORD: {
    PBKDF2: { KEY_LENGTH },
  },
} = ENCRYPTION;

describe('helpers/get-account-verification-hash', () => {
  let context: Context;
  let result: AccountVerification;

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    const account = (await accounts.create({ context })) as Account;

    const { email, salt } = account;

    result = await generateAccountVerificationHash(email, salt);
  });

  it('should generate and return a verification hash', () => {
    expect(result.verificationHash.length).toEqual(KEY_LENGTH * 2);
  });

  it('should generate and return verification expiry date', () => {
    const expiry = new Date(result.verificationExpiry);

    const expiryDay = expiry.getDate();

    const tomorrow = DATE_24_HOURS_FROM_NOW();
    const tomorrowDay = new Date(tomorrow).getDate();

    expect(expiryDay).toEqual(tomorrowDay);
  });
});
