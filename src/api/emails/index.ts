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

    const emailResponse = await notify.sendEmail(EMAIL_TEMPLATE_IDS.ACCOUNT.CONFIRM_EMAIL, email, firstName, verificationHash);

    if (emailResponse.success) {
      return emailResponse;
    }

    throw new Error(`Sending email verification for account creation ${emailResponse}`);
  } catch (err) {
    console.error(err);

    throw new Error(`Sending email verification for account creation ${err}`);
  }
};

const sendEmail = {
  confirmEmailAddress,
};

export default sendEmail;
