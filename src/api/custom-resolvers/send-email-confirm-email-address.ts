import { Context } from '.keystone/types'; // eslint-disable-line
import { EMAIL_TEMPLATE_IDS } from '../constants';
import notify from '../integrations/notify';
import { SendEmailConfirmEmailAddressVariables } from '../types';

/**
 * sendEmailConfirmEmailAddress
 * @param {Object} GraphQL root variables
 * @param {Object} GrappL variables for the SendEmailConfirmEmailAddress mutation
 * @param {Object} KeystoneJS context API
 * @returns {Object} Object with success flag and emailRecipient
 */
const sendEmailConfirmEmailAddress = async (root: any, variables: SendEmailConfirmEmailAddressVariables, context: Context) => {
  console.info('Sending email verification for account creation');

  try {
    // Get the account the ID is associated with.
    const exporter = await context.db.Exporter.findOne({
      where: {
        id: variables.exporterId,
      },
    });

    // ensure that we have found an acount with the requsted ID.
    if (!exporter || !exporter.id) {
      console.info('Sending email verification for account creation - no exporter exists with the provided ID');

      return {
        success: false,
      };
    }

    const { email, firstName, verificationHash } = exporter;

    // send "confirm email" email with verification token/hash.
    const emailResponse = await notify.sendEmail(EMAIL_TEMPLATE_IDS.ACCOUNT.CONFIRM_EMAIL, email, firstName, verificationHash);

    if (emailResponse.success) {
      return {
        success: true,
        emailRecipient: exporter.email,
      };
    }

    throw new Error(`Sending email verification for account creation ${emailResponse}`);
  } catch (err) {
    throw new Error(`Sending email verification for account creation ${err}`);
  }
};

export default sendEmailConfirmEmailAddress;
