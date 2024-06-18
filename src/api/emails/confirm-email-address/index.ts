import { EMAIL_TEMPLATE_IDS } from '../../constants';
import { callNotify } from '../call-notify';
import { EmailResponse } from '../../types';

/**
 * confirmEmailAddress
 * Send "confirm your email address" email to an account
 * @param {String} Email address
 * @param {String} URL origin
 * @param {String} Name
 * @param {String} Verification hash
 * @param {String} Account ID
 * @returns {Promise<Object>} callNotify response
 */
export const confirmEmailAddress = async (
  emailAddress: string,
  urlOrigin: string,
  name: string,
  verificationHash: string,
  id: string,
): Promise<EmailResponse> => {
  try {
    console.info('Sending confirm email address email');

    const templateId = EMAIL_TEMPLATE_IDS.ACCOUNT.CONFIRM_EMAIL;

    const variables = { urlOrigin, name, confirmToken: verificationHash, id };

    const response = await callNotify(templateId, emailAddress, variables);

    return response;
  } catch (err) {
    console.error('Error sending confirm email address email %O', err);

    throw new Error(`Sending confirm email address email ${err}`);
  }
};
