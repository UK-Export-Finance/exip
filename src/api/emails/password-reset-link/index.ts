import { EMAIL_TEMPLATE_IDS } from '../../constants';
import APIM from '../../integrations/APIM';
import { ApimSendEmailHelperResponse } from '../../types';

/**
 * passwordResetLink
 * Send "reset your password" email to an account
 * @param {string} Email address
 * @param {string} Name
 * @param {string} Password reset token
 * @returns {Promise<ApimSendEmailHelperResponse>}
 */
export const passwordResetLink = async (
  urlOrigin: string,
  emailAddress: string,
  name: string,
  passwordResetHash: string,
): Promise<ApimSendEmailHelperResponse> => {
  try {
    console.info('Sending email for account password reset');

    const templateId = EMAIL_TEMPLATE_IDS.ACCOUNT.PASSWORD_RESET;

    const variables = { urlOrigin, name, passwordResetToken: passwordResetHash };

    const response = await APIM.sendEmail(templateId, emailAddress, variables);

    return response;
  } catch (error) {
    console.error('Error sending email for account password reset %o', error);

    throw new Error(`Sending email for account password reset ${error}`);
  }
};
