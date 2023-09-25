import getAccountById from '../get-account-by-id';
import getFullNameString from '../get-full-name-string';
import sendEmail from '../../emails';
import { Context, SuccessResponse } from '../../types';

/**
 * confirmEmailAddressEmail.send
 * @param {Object} KeystoneJS context API
 * @param {String} Account ID
 * @returns {Object} Object with success flag and emailRecipient
 */
const send = async (context: Context, urlOrigin: string, accountId: string): Promise<SuccessResponse> => {
  try {
    console.info('Sending email verification');

    // get the account
    const account = await getAccountById(context, accountId);

    // ensure that we have found an account with the requested ID.
    if (!account) {
      console.info('Sending email verification - no account exists with the provided account ID');

      return {
        success: false,
      };
    }

    // send "confirm email" email.
    const { email, verificationHash } = account;

    const name = getFullNameString(account);

    const emailResponse = await sendEmail.confirmEmailAddress(email, urlOrigin, name, verificationHash);

    if (emailResponse.success) {
      return emailResponse;
    }

    throw new Error(`Sending email verification (sendEmailConfirmEmailAddress helper) ${emailResponse}`);
  } catch (err) {
    console.error('Error sending email verification (sendEmailConfirmEmailAddress helper) %O', err);
    throw new Error(`Sending email verification (sendEmailConfirmEmailAddress helper) ${err}`);
  }
};

const confirmEmailAddressEmail = {
  send,
};

export default confirmEmailAddressEmail;
