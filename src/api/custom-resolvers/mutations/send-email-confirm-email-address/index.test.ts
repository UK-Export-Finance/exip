import sendEmailConfirmEmailAddressMutation from '.';
import getFullNameString from '../../../helpers/get-full-name-string';
import sendEmail from '../../../emails';
import accounts from '../../../test-helpers/accounts';
import { mockAccount, mockSendEmailResponse } from '../../../test-mocks';
import { Account, SendExporterEmailVariables } from '../../../types';
import getKeystoneContext from '../../../test-helpers/get-keystone-context';

const context = getKeystoneContext();

describe('custom-resolvers/send-email-confirm-email-address', () => {
  let account: Account;
  let variables: SendExporterEmailVariables;

  let sendConfirmEmailAddressEmailSpy = jest.fn();

  afterAll(() => {
    jest.resetAllMocks();
  });

  beforeEach(async () => {
    account = await accounts.create(context);

    variables = {
      urlOrigin: 'https://mock-origin.com',
      accountId: account.id,
    };

    jest.resetAllMocks();

    sendConfirmEmailAddressEmailSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));

    sendEmail.confirmEmailAddress = sendConfirmEmailAddressEmailSpy;
  });

  test('it should call sendEmail.confirmEmailAddress and return success=true', async () => {
    const result = await sendEmailConfirmEmailAddressMutation({}, variables, context);

    const { email, verificationHash } = account;

    const name = getFullNameString(account);

    expect(sendConfirmEmailAddressEmailSpy).toHaveBeenCalledTimes(1);
    expect(sendConfirmEmailAddressEmailSpy).toHaveBeenCalledWith(email, variables.urlOrigin, name, verificationHash);

    const expected = {
      success: true,
      emailRecipient: mockAccount.email,
    };

    expect(result).toEqual(expected);
  });

  describe('when sendEmailConfirmEmailAddress does not return success=true', () => {
    test('should throw an error', async () => {
      try {
        await sendEmailConfirmEmailAddressMutation({}, variables, context);
      } catch (err) {
        const expected = new Error('Sending email verification for account creation (sendEmailConfirmEmailAddress mutation)');

        expect(err).toEqual(expected);
      }
    });
  });
});
