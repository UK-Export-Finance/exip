import { EMAIL_TEMPLATE_IDS } from '../constants';
import notify from '../integrations/notify';
import { EmailResponse } from '../types';

/**
 * callNotify
 * @param {String} Notify template ID
 * @param {String} Email address
 * @param {String} First name
 * @param {Object} Email variables
 * @returns {Object} Object with success flag and emailRecipient
 */
export const callNotify = async (templateId: string, emailAddress: string, firstName: string, variables: object): Promise<EmailResponse> => {
  try {
    const emailResponse = await notify.sendEmail(templateId, emailAddress, firstName, variables);

    if (emailResponse.success) {
      return emailResponse;
    }

    throw new Error(`Sending email ${emailResponse}`);
  } catch (err) {
    console.error(err);

    throw new Error(`Sending email ${err}`);
  }
};

/**
 * confirmEmailAddress
 * @param {String} Email address
 * @param {String} First name
 * @param {String} Verification hash
 * @returns {Object} callNotify response
 */
const confirmEmailAddress = async (emailAddress: string, firstName: string, verificationHash: string): Promise<EmailResponse> => {
  try {
    console.info('Sending email verification for account creation');

    const templateId = EMAIL_TEMPLATE_IDS.ACCOUNT.CONFIRM_EMAIL;

    const variables = { confirmToken: verificationHash };

    const response = await callNotify(templateId, emailAddress, firstName, variables);

    return response;
  } catch (err) {
    console.error(err);

    throw new Error(`Sending email verification for account creation ${err}`);
  }
};

/**
 * securityCodeEmail
 * @param {String} Email address
 * @param {String} First name
 * @param {String} Security code
 * @returns {Object} callNotify response
 */
const securityCodeEmail = async (emailAddress: string, firstName: string, securityCode: string): Promise<EmailResponse> => {
  try {
    console.info('Sending security code email for account sign in');

    const templateId = EMAIL_TEMPLATE_IDS.ACCOUNT.SECURITY_CODE;

    const variables = { securityCode };

    const response = await callNotify(templateId, emailAddress, firstName, variables);

    return response;
  } catch (err) {
    console.error(err);

    throw new Error(`Sending security code email for account sign in ${err}`);
  }
};

const sendEmail = {
  confirmEmailAddress,
  securityCodeEmail,
};

export default sendEmail;
