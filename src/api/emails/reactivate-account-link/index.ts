import { EMAIL_TEMPLATE_IDS } from '../../constants';
import { callNotify } from '../call-notify';
import { EmailResponse } from '../../types';

/**
 * reactivateAccountLink
 * Send "reactivate account" email
 * @param {String} Email address
 * @param {String} Name
 * @param {String} Password reset token
 * @returns {Object} callNotify response
 */
export const reactivateAccountLink = async (urlOrigin: string, emailAddress: string, name: string, reactivationHash: string): Promise<EmailResponse> => {
  try {
    console.info('Sending email for account reactivation');

    const templateId = EMAIL_TEMPLATE_IDS.ACCOUNT.REACTIVATE_ACCOUNT_CONFIRM_EMAIL;

    const variables = { urlOrigin, name, reactivationToken: reactivationHash };

    const response = await callNotify(templateId, emailAddress, variables);

    return response;
  } catch (err) {
    console.error('Error sending email for account reactivation %O', err);

    throw new Error(`Sending email for account reactivation ${err}`);
  }
};
