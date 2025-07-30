import confirmEmailAddressEmail from '../../../helpers/send-email-confirm-email-address';
import { Context, SendConfirmEmailAddressVariables } from '../../../types';

/**
 * sendEmailConfirmEmailAddress
 * @param {object} root: GraphQL root variables
 * @param {object} variables: GraphQL variables for the SendEmailConfirmEmailAddress mutation
 * @param {Context} context: KeystoneJS context API
 * @returns {Promise<SuccessResponse>} Object with success flag / result of sendEmailConfirmEmailAddress
 */
const sendEmailConfirmEmailAddressMutation = async (root: any, variables: SendConfirmEmailAddressVariables, context: Context) => {
  try {
    console.info('Sending email verification for account creation');

    const emailResponse = await confirmEmailAddressEmail.send(context, variables.urlOrigin, variables.accountId);

    if (emailResponse.success) {
      return emailResponse;
    }

    throw new Error(`Sending email verification for account creation (sendEmailConfirmEmailAddress mutation) ${emailResponse}`);
  } catch (error) {
    console.error('Error sending email verification for account creation (sendEmailConfirmEmailAddress mutation) %o', error);

    throw new Error(`Sending email verification for account creation (sendEmailConfirmEmailAddress mutation) ${error}`);
  }
};

export default sendEmailConfirmEmailAddressMutation;
