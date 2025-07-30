import { EMAIL_TEMPLATE_IDS } from '../../constants';
import APIM from '../../integrations/APIM';
import { ApimSendEmailHelperResponse } from '../../types';

/**
 * accessCodeEmail
 * Send the access code email to an account
 * @param {string} Email address
 * @param {string} Name
 * @param {string} Security code
 * @returns {Promise<ApimSendEmailHelperResponse>}
 */
export const accessCodeEmail = async (emailAddress: string, name: string, securityCode: string): Promise<ApimSendEmailHelperResponse> => {
  try {
    console.info('Sending access code email for account sign in');

    const templateId = EMAIL_TEMPLATE_IDS.ACCOUNT.ACCESS_CODE;

    const variables = { name, securityCode };

    const response = await APIM.sendEmail(templateId, emailAddress, variables);

    return response;
  } catch (error) {
    console.error('Error sending access code email for account sign in %o', error);

    throw new Error(`Sending access code email for account sign in ${error}`);
  }
};
