import { callNotify } from '../call-notify';
import { ApplicationSubmissionEmailVariables, EmailResponse } from '../../types';

/**
 * documentsEmail
 * Send "we need some documents from you" email to an account
 * @param {ApplicationSubmissionEmailVariables}
 * @param {Boolean} Flag for sending anti-bribery/trading history template
 * @returns {Promise<Object>} callNotify response
 */
export const documentsEmail = async (variables: ApplicationSubmissionEmailVariables, templateId: string): Promise<EmailResponse> => {
  try {
    console.info('Sending documents email');

    const { emailAddress } = variables;

    const response = await callNotify(templateId, emailAddress, variables);

    return response;
  } catch (err) {
    console.error('Error sending documents email %O', err);

    throw new Error(`Sending documents email ${err}`);
  }
};
