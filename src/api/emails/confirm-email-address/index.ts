import { EMAIL_TEMPLATE_IDS } from '../../constants';
import APIM from '../../integrations/APIM';
import { ApimSendEmailHelperResponse } from '../../types';

/**
 * confirmEmailAddress
 * Send "confirm your email address" email to an account
 * @param {string} emailAddress: Email address
 * @param {string} urlOrigin: URL origin
 * @param {string} name: Name
 * @param {string} verificationHash: Verification hash
 * @param {string} id: Account ID
 * @returns {Promise<ApimSendEmailHelperResponse>}
 */
export const confirmEmailAddress = async (
  emailAddress: string,
  urlOrigin: string,
  name: string,
  verificationHash: string,
  id: string,
): Promise<ApimSendEmailHelperResponse> => {
  try {
    console.info('Sending confirm email address email');

    const templateId = EMAIL_TEMPLATE_IDS.ACCOUNT.CONFIRM_EMAIL;

    const variables = { urlOrigin, name, confirmToken: verificationHash, id };

    const response = await APIM.sendEmail(templateId, emailAddress, variables);

    return response;
  } catch (error) {
    console.error('Error sending confirm email address email %o', error);

    throw new Error(`Sending confirm email address email ${error}`);
  }
};
