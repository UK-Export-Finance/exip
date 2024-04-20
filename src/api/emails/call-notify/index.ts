import notify from '../../integrations/notify';
import { EmailResponse } from '../../types';

/**
 * callNotify
 * Call Notify API
 * @param {String} Notify template ID
 * @param {String} Email address
 * @param {String} Name
 * @param {Object} Email variables
 * @returns {Promise<Object>} Object with success flag and emailRecipient
 */
export const callNotify = async (templateId: string, emailAddress: string, variables: object, file?: Buffer): Promise<EmailResponse> => {
  try {
    let emailResponse;

    if (file) {
      emailResponse = await notify.sendEmail(templateId, emailAddress, variables, file);
    } else {
      emailResponse = await notify.sendEmail(templateId, emailAddress, variables);
    }

    if (emailResponse.success) {
      return emailResponse;
    }

    throw new Error(`Sending email ${emailResponse}`);
  } catch (err) {
    console.error('Error sending email %O', err);

    throw new Error(`Sending email ${err}`);
  }
};
