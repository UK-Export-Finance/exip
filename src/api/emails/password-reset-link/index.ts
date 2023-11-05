import { EMAIL_TEMPLATE_IDS } from '../../constants';
import { callNotify } from '../call-notify';
import { EmailResponse } from '../../types';

/**
 * passwordResetLink
 * Send "reset your password" email to an account
 * @param {String} Email address
 * @param {String} Name
 * @param {String} Password reset token
 * @returns {Object} callNotify response
 */
export const passwordResetLink = async (urlOrigin: string, emailAddress: string, name: string, passwordResetHash: string): Promise<EmailResponse> => {
  try {
    console.info('Sending email for account password reset');

    const templateId = EMAIL_TEMPLATE_IDS.ACCOUNT.PASSWORD_RESET;

    const variables = { urlOrigin, name, passwordResetToken: passwordResetHash };

    const response = await callNotify(templateId, emailAddress, variables);

    return response;
  } catch (err) {
    console.error('Error sending email for account password reset %O', err);

    throw new Error(`Sending email for account password reset ${err}`);
  }
};
