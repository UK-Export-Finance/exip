import { EMAIL_TEMPLATE_IDS } from '../../constants';
import { callNotify } from '../call-notify';
import { EmailResponse } from '../../types';

/**
 * securityCodeEmail
 * Send the security code email to an account
 * @param {String} Email address
 * @param {String} Name
 * @param {String} Security code
 * @returns {Object} callNotify response
 */
export const securityCodeEmail = async (emailAddress: string, name: string, securityCode: string): Promise<EmailResponse> => {
  try {
    console.info('Sending security code email for account sign in');

    const templateId = EMAIL_TEMPLATE_IDS.ACCOUNT.SECURITY_CODE;

    const variables = { name, securityCode };

    const response = await callNotify(templateId, emailAddress, variables);

    return response;
  } catch (err) {
    console.error('Error sending security code email for account sign in %O', err);

    throw new Error(`Sending security code email for account sign in ${err}`);
  }
};
