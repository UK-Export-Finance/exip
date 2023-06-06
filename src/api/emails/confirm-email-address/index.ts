import { EMAIL_TEMPLATE_IDS } from '../../constants';
import { callNotify } from '../call-notify';
import { EmailResponse } from '../../types';

/**
 * confirmEmailAddress
 * Send "confirm your email address" email to an account
 * @param {String} Email address
 * @param {String} Name
 * @param {String} Verification hash
 * @returns {Object} callNotify response
 */
export const confirmEmailAddress = async (emailAddress: string, urlOrigin: string, name: string, verificationHash: string): Promise<EmailResponse> => {
  try {
    console.info('Sending confirm email address email');

    const templateId = EMAIL_TEMPLATE_IDS.ACCOUNT.CONFIRM_EMAIL;

    const variables = { urlOrigin, name, confirmToken: verificationHash };

    const response = await callNotify(templateId, emailAddress, variables);

    return response;
  } catch (err) {
    console.error(err);

    throw new Error(`Sending confirm email address email ${err}`);
  }
};
