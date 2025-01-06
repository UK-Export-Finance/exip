import sendEmailReactivateAccountLinkHelper from '../../../helpers/send-email-reactivate-account-link';
import { AccountSendEmailReactivateLinkVariables, AccountSendEmailReactivateLinkResponse, Context } from '../../../types';

/**
 * sendEmailReactivateAccountLink
 * Generate a hash, update account and send a link to the account via email.
 * @param {Object} root: GraphQL root variables
 * @param {Object} variables: GraphQL variables for the SendReactivateAccountEmail mutation
 * @param {Context} context: KeystoneJS context API
 * @returns {Promise<Object>} Object with success flag
 */
const sendEmailReactivateAccountLink = async (
  root: any,
  variables: AccountSendEmailReactivateLinkVariables,
  context: Context,
): Promise<AccountSendEmailReactivateLinkResponse> => {
  try {
    console.info('Received a request to send reactivate account email/link - checking account');

    const reactiveAccountResponse = await sendEmailReactivateAccountLinkHelper.send(variables, context);

    return reactiveAccountResponse;
  } catch (error) {
    console.error('Error checking account and sending reactivate account email/link (sendEmailReactivateAccountLink mutation) %o', error);

    throw new Error(`Checking account and sending reactivate account email/link (sendEmailReactivateAccountLink mutation) ${error}`);
  }
};

export default sendEmailReactivateAccountLink;
