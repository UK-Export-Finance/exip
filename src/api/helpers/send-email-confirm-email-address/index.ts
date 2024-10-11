import getAccountById from '../get-account-by-id';
import generateAccountVerificationHash from '../get-account-verification-hash';
import update from '../update-account';
import getFullNameString from '../get-full-name-string';
import sendEmail from '../../emails';
import { dateIsInThePast } from '../date';
import { Context, SuccessResponse } from '../../types';

/**
 * confirmEmailAddressEmail.send
 * @param {Context} context: KeystoneJS context API
 * @param {String} Account ID
 * @returns {Promise<Object>} Object with success flag and emailRecipient
 */
const send = async (context: Context, urlOrigin: string, accountId: string): Promise<SuccessResponse> => {
  try {
    console.info('Sending email verification %s %s', urlOrigin, accountId);

    // get the account
    const account = await getAccountById(context, accountId);

    // ensure that we have found an account with the requested ID.
    if (!account) {
      console.info('Sending email verification - no account exists with the provided account ID');

      return {
        success: false,
      };
    }

    let latestVerificationHash = '';

    let verificationHasExpired = false;

    if (account.verificationExpiry) {
      verificationHasExpired = dateIsInThePast(account.verificationExpiry);
    }

    /**
     * if the account already has a verificationHash and if it has not expired
     * then set latestVerificationHash as account's verification hash
     */
    if (account.verificationHash && !verificationHasExpired) {
      latestVerificationHash = account.verificationHash;
    } else {
      /**
       * If an account does not have a verification hash or an account has an expired verification,
       * 1) Generate a new hash
       * 2) Update the account
       */
      const { email, salt } = account;

      const { verificationHash, verificationExpiry } = generateAccountVerificationHash(email, salt);

      const accountUpdate = { verificationHash, verificationExpiry };

      latestVerificationHash = verificationHash;

      await update.account(context, accountId, accountUpdate);
    }

    // send "confirm email" email.
    const { email, id } = account;

    const name = getFullNameString(account);

    const emailResponse = await sendEmail.confirmEmailAddress(email, urlOrigin, name, latestVerificationHash, id);

    if (emailResponse?.success) {
      return emailResponse;
    }

    throw new Error(`Sending email verification (sendEmailConfirmEmailAddress helper) ${emailResponse}`);
  } catch (error) {
    console.error('Error sending email verification (sendEmailConfirmEmailAddress helper) %o', error);

    throw new Error(`Sending email verification (sendEmailConfirmEmailAddress helper) ${error}`);
  }
};

const confirmEmailAddressEmail = {
  send,
};

export default confirmEmailAddressEmail;
