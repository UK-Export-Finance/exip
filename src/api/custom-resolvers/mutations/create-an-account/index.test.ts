import createAnAccount from '.';
import { ACCOUNT, DATE_24_HOURS_FROM_NOW } from '../../../constants';
import getFullNameString from '../../../helpers/get-full-name-string';
import sendEmail from '../../../emails';
import accounts from '../../../test-helpers/accounts';
import { mockAccount, mockSendEmailResponse } from '../../../test-mocks';
import { Account, Context } from '../../../types';
import getKeystoneContext from '../../../test-helpers/get-keystone-context';

const { ENCRYPTION } = ACCOUNT;

const {
  RANDOM_BYTES_SIZE,
  PASSWORD: {
    PBKDF2: { KEY_LENGTH },
  },
} = ENCRYPTION;

describe('custom-resolvers/create-an-account', () => {
  let context: Context;
  let account: Account;

  jest.mock('../../../emails');

  let sendEmailConfirmEmailAddressSpy = jest.fn();

  const mockPassword = String(process.env.MOCK_ACCOUNT_PASSWORD);

  const variables = {
    urlOrigin: 'https://mock-origin.com',
    firstName: 'a',
    lastName: 'b',
    email: mockAccount.email,
    password: mockPassword,
  };

  beforeAll(() => {
    context = getKeystoneContext();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  beforeEach(async () => {
    jest.resetAllMocks();

    sendEmailConfirmEmailAddressSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));

    sendEmail.confirmEmailAddress = sendEmailConfirmEmailAddressSpy;

    await accounts.deleteAll(context);

    // create an account
    account = (await createAnAccount({}, variables, context)) as Account;
  });

  it('should generate and return the created account with added salt and hashes', () => {
    expect(account.firstName).toEqual(variables.firstName);
    expect(account.lastName).toEqual(variables.lastName);
    expect(account.email).toEqual(variables.email);
    expect(account.salt.length).toEqual(RANDOM_BYTES_SIZE * 2);
    expect(account.hash.length).toEqual(KEY_LENGTH * 2);
    expect(account.verificationHash.length).toEqual(KEY_LENGTH * 2);
  });

  it('should generate accountStatus fields', () => {
    const { accountStatus } = account;

    expect(accountStatus.isBlocked).toEqual(false);
    expect(accountStatus.isVerified).toEqual(false);
    expect(accountStatus.isInactivated).toEqual(false);
  });

  it('should generate and return verification expiry date', () => {
    const expiry = new Date(account.verificationExpiry);

    const expiryDay = expiry.getDate();

    const tomorrow = DATE_24_HOURS_FROM_NOW();
    const tomorrowDay = new Date(tomorrow).getDate();

    expect(expiryDay).toEqual(tomorrowDay);
  });

  it('should call sendEmail.confirmEmailAddress', () => {
    const { email, verificationHash, id } = account;

    const name = getFullNameString(account);

    expect(sendEmailConfirmEmailAddressSpy).toHaveBeenCalledTimes(1);
    expect(sendEmailConfirmEmailAddressSpy).toHaveBeenCalledWith(email, variables.urlOrigin, name, verificationHash, id);
  });

  describe('when an account with the provided email already exists', () => {
    let result: Account;

    beforeAll(async () => {
      // attempt to create account with the same email
      result = (await createAnAccount({}, variables, context)) as Account;
    });

    it('should return success=false', () => {
      const expected = {
        success: false,
      };

      expect(result).toEqual(expected);
    });

    it('should not create the account', async () => {
      const allAccounts = await context.query.Account.findMany();

      // should only have the first created account
      expect(allAccounts.length).toEqual(1);
    });
  });

  describe('error handling', () => {
    describe('when sendEmail.confirmEmailAddress does not return success=true', () => {
      const emailFailureResponse = { ...mockSendEmailResponse, success: false };

      beforeEach(() => {
        sendEmail.confirmEmailAddress = jest.fn(() => Promise.resolve(emailFailureResponse));
      });

      test('should throw an error', async () => {
        try {
          await createAnAccount({}, variables, context);
        } catch (err) {
          const expected = new Error(`Sending email verification for account creation ${emailFailureResponse}`);
          expect(err).toEqual(expected);
        }
      });
    });
  });
});
