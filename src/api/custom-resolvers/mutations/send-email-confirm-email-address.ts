import { Context } from '.keystone/types'; // eslint-disable-line
import sendEmail from '../../emails';
import getAccountById from '../../helpers/get-account-by-id';
import { SendExporterEmailVariables } from '../../types';

/**
 * sendEmailConfirmEmailAddress
 * @param {Object} GraphQL root variables
 * @param {Object} GraphQL variables for the SendEmailConfirmEmailAddress mutation
 * @param {Object} KeystoneJS context API
 * @returns {Object} Object with success flag and emailRecipient
 */
const sendEmailConfirmEmailAddress = async (root: any, variables: SendExporterEmailVariables, context: Context) => {
  try {
    // get the account
    const account = await getAccountById(context, variables.accountId);

    // ensure that we have found an acount with the requsted ID.
    if (!account) {
      console.info('Sending email verification for account creation - no account exists with the provided ID');

      return {
        success: false,
      };
    }

    // send "confirm email" email.
    const { email, firstName, verificationHash } = account;

    const emailResponse = await sendEmail.confirmEmailAddress(email, firstName, verificationHash);

    if (emailResponse.success) {
      return emailResponse;
    }

    throw new Error(`Sending email verification for account creation (sendEmailConfirmEmailAddress mutation) ${emailResponse}`);
  } catch (err) {
    console.error(err);
    throw new Error(`Sending email verification for account creation (sendEmailConfirmEmailAddress mutation) ${err}`);
  }
};

export default sendEmailConfirmEmailAddress;
