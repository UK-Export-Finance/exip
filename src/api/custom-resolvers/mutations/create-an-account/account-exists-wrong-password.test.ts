import createAnAccount from '.';
import sendEmail from '../../../emails';
import confirmEmailAddressEmail from '../../../helpers/send-email-confirm-email-address';
import accounts from '../../../test-helpers/accounts';
import { mockAccount, mockSendEmailResponse } from '../../../test-mocks';
import { Account, Context } from '../../../types';
import getKeystoneContext from '../../../test-helpers/get-keystone-context';

describe('custom-resolvers/create-an-account - account exists and wrong password provided', () => {
  let context: Context;

  jest.mock('../../../emails');

  let sendEmailConfirmEmailAddressSpy = jest.fn();
  const sendConfirmEmailAddressEmailSpy = jest.fn();

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

  describe('when an account with the provided email already exists, but the provided password is invalid', () => {
    let result: Account;

    beforeAll(async () => {
      jest.resetAllMocks();

      sendEmailConfirmEmailAddressSpy = jest.fn(() => Promise.resolve(mockSendEmailResponse));
      sendEmail.confirmEmailAddress = sendEmailConfirmEmailAddressSpy;

      confirmEmailAddressEmail.send = sendConfirmEmailAddressEmailSpy;

      await accounts.deleteAll(context);

      (await createAnAccount({}, variables, context)) as Account;

      // attempt to create account with the same email
      const variablesInvalidPassword = {
        ...variables,
        password: `${mockPassword}-invalid`,
      };

      result = (await createAnAccount({}, variablesInvalidPassword, context)) as Account;
    });

    it('should return success=false', () => {
      const expected = {
        success: false,
      };

      expect(result).toEqual(expected);
    });
  });
});
