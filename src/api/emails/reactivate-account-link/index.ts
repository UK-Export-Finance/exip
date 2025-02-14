import { EMAIL_TEMPLATE_IDS } from '../../constants';
import APIM from '../../integrations/APIM';
import { ApimSendEmailHelperResponse } from '../../types';

/**
 * reactivateAccountLink
 * Send "reactivate account" email
 * @param {String} Email address
 * @param {String} Name
 * @param {String} Password reset token
 * @returns {Promise<ApimSendEmailHelperResponse>}
 */
export const reactivateAccountLink = async (
  urlOrigin: string,
  emailAddress: string,
  name: string,
  reactivationHash: string,
): Promise<ApimSendEmailHelperResponse> => {
  try {
    console.info('Sending email for account reactivation');

    const templateId = EMAIL_TEMPLATE_IDS.ACCOUNT.REACTIVATE_ACCOUNT_CONFIRM_EMAIL;

    const variables = { urlOrigin, name, reactivationToken: reactivationHash };

    const response = await APIM.sendEmail(templateId, emailAddress, variables);

    return response;
  } catch (error) {
    console.error('Error sending email for account reactivation %o', error);

    throw new Error(`Sending email for account reactivation ${error}`);
  }
};
