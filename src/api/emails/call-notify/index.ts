import notify from '../../integrations/notify';

/**
 * callNotify
 * Call Notify API
 * @param {String} Notify template ID
 * @param {String} Email address
 * @param {String} First name
 * @param {Object} Email variables
 * @returns {Object} Object with success flag and emailRecipient
 */
export const callNotify = async (templateId: string, emailAddress: string, variables: object, file?: Buffer, fileIsCsv?: boolean): Promise<EmailResponse> => {
  try {
    let emailResponse;

    if (file && fileIsCsv) {
      emailResponse = await notify.sendEmail(templateId, emailAddress, variables, file, fileIsCsv);
    } else {
      emailResponse = await notify.sendEmail(templateId, emailAddress, variables);
    }

    if (emailResponse.success) {
      return emailResponse;
    }

    throw new Error(`Sending email ${emailResponse}`);
  } catch (err) {
    console.error(err);

    throw new Error(`Sending email ${err}`);
  }
};
