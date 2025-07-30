import APIM from '../../integrations/APIM';
import { ApplicationSubmissionEmailVariables, ApimSendEmailHelperResponse } from '../../types';

/**
 * documentsEmail
 * Send "we need some documents from you" email to an account
 * @param {ApplicationSubmissionEmailVariables}
 * @param {boolean} Flag for sending anti-bribery/trading history template
 * @returns {Promise<ApimSendEmailHelperResponse>}
 */
export const documentsEmail = async (variables: ApplicationSubmissionEmailVariables, templateId: string): Promise<ApimSendEmailHelperResponse> => {
  try {
    console.info('Sending documents email');

    const { emailAddress } = variables;

    const response = await APIM.sendEmail(templateId, emailAddress, variables);

    return response;
  } catch (error) {
    console.error('Error sending documents email %o', error);

    throw new Error(`Sending documents email ${error}`);
  }
};
