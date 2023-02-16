import { EMAIL_TEMPLATE_IDS } from '../constants';
import notify from '../integrations/notify';
import { EmailResponse } from '../types';

/**
 * confirmEmailAddress
 * @param {String} Email address
 * @param {String} First name
 * @param {String} Verification hash
 * @returns {Object} Object with success flag and emailRecipient
 */
const confirmEmailAddress = async (email: string, firstName: string, verificationHash: string): Promise<EmailResponse> => {
  try {
    console.info('Sending email verification for account creation');

    const variables = { confirmToken: verificationHash };

    const emailResponse = await notify.sendEmail(EMAIL_TEMPLATE_IDS.ACCOUNT.CONFIRM_EMAIL, email, firstName, variables);

    if (emailResponse.success) {
      return emailResponse;
    }

    throw new Error(`Sending email verification for account creation ${emailResponse}`);
  } catch (err) {
    console.error(err);

    throw new Error(`Sending email verification for account creation ${err}`);
  }
};

const securityCodeEmail = async (email: string, firstName: string, securityCode: string): Promise<EmailResponse> => {
  try {
    console.info('Sending security code email for account sign in');

    const variables = { securityCode };

    const emailResponse = await notify.sendEmail(EMAIL_TEMPLATE_IDS.ACCOUNT.SECURITY_CODE, email, firstName, variables);

    if (emailResponse.success) {
      return emailResponse;
    }

    throw new Error(`Sending security code email for account sign in ${emailResponse}`);
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
