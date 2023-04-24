import { Context } from '.keystone/types'; // eslint-disable-line
import sendEmail from '../../emails';
import getExporterById from '../../helpers/get-exporter-by-id';
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
    // get the exporter
    const exporter = await getExporterById(context, variables.exporterId);

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
