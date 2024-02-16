import { EMAIL_TEMPLATE_IDS } from '../../constants';
import { callNotify } from '../call-notify';
import { EmailResponse } from '../../types';

/**
 * accessCodeEmail
 * Send the access code email to an account
 * @param {String} Email address
 * @param {String} Name
 * @param {String} Security code
 * @returns {Object} callNotify response
 */
export const accessCodeEmail = async (emailAddress: string, name: string, securityCode: string): Promise<EmailResponse> => {
  try {
    console.info('Sending access code email for account sign in');

    const templateId = EMAIL_TEMPLATE_IDS.ACCOUNT.ACCESS_CODE;

    const variables = { name, securityCode };

    const response = await callNotify(templateId, emailAddress, variables);

    return response;
  } catch (err) {
    console.error('Error sending access code email for account sign in %O', err);

    throw new Error(`Sending access code email for account sign in ${err}`);
  }
};
