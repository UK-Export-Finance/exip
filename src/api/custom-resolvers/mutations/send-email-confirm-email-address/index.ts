import confirmEmailAddressEmail from '../../../helpers/send-email-confirm-email-address';
import { Context, SendConfirmEmailAddressVariables } from '../../../types';

/**
 * sendEmailConfirmEmailAddress
 * @param {Object} GraphQL root variables
 * @param {Object} GraphQL variables for the SendEmailConfirmEmailAddress mutation
 * @param {Object} KeystoneJS context API
 * @returns {Promise<Object>} Object with success flag / result of sendEmailConfirmEmailAddress
 */
const sendEmailConfirmEmailAddressMutation = async (root: any, variables: SendConfirmEmailAddressVariables, context: Context) => {
  try {
    console.info('Sending email verification for account creation');

    const emailResponse = await confirmEmailAddressEmail.send(context, variables.urlOrigin, variables.accountId);

    if (emailResponse.success) {
      return emailResponse;
    }

    throw new Error(`Sending email verification for account creation (sendEmailConfirmEmailAddress mutation) ${emailResponse}`);
  } catch (err) {
    console.error('Error sending email verification for account creation (sendEmailConfirmEmailAddress mutation) %O', err);
    throw new Error(`Sending email verification for account creation (sendEmailConfirmEmailAddress mutation) ${err}`);
  }
};

export default sendEmailConfirmEmailAddressMutation;
