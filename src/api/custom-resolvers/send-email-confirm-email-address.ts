import { Context } from '.keystone/types'; // eslint-disable-line
import sendEmail from '../emails';
import { Account, SendEmailConfirmEmailAddressVariables } from '../types';

/**
 * sendEmailConfirmEmailAddress
 * @param {Object} GraphQL root variables
 * @param {Object} GraphQL variables for the SendEmailConfirmEmailAddress mutation
 * @param {Object} KeystoneJS context API
 * @returns {Object} Object with success flag and emailRecipient
 */
const sendEmailConfirmEmailAddress = async (root: any, variables: SendEmailConfirmEmailAddressVariables, context: Context) => {
  try {
    // Get the account the ID is associated with.
    const exporter = (await context.db.Exporter.findOne({
      where: {
        id: variables.exporterId,
      },
    })) as Account;

    // ensure that we have found an acount with the requsted ID.
    if (!exporter) {
      console.info('Sending email verification for account creation - no exporter exists with the provided ID');

      return {
        success: false,
      };
    }

    // send "confirm email" email.
    const { email, firstName, verificationHash } = exporter;

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
