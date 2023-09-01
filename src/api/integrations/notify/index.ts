import dotenv from 'dotenv';
// @ts-ignore
import { NotifyClient } from 'notifications-node-client';
import { NotifyPersonalisation } from '../../types';

dotenv.config();

const notifyKey = process.env.GOV_NOTIFY_API_KEY;
const notifyClient = new NotifyClient(notifyKey);

const notify = {
  /**
   * sendEmail
   * Send an email via Notify API
   * @param {String} Template ID
   * @param {String} Email address
   * @param {Object} Custom variables for the email template
   * @param {Buffer} File buffer
   * @returns {Object} Success flag and email recipient
   */
  sendEmail: async (templateId: string, sendToEmailAddress: string, variables: object, file?: Buffer) => {
    try {
      console.info('Calling Notify API. templateId: %s', templateId);

      const personalisation = variables as NotifyPersonalisation;

      if (file) {
        personalisation.linkToFile = await notifyClient.prepareUpload(file, { confirmEmailBeforeDownload: true });
      }

      await notifyClient.sendEmail(templateId, sendToEmailAddress, {
        personalisation,
        reference: null,
      });

      return {
        success: true,
        emailRecipient: sendToEmailAddress,
      };
    } catch (err) {
      console.error('Error calling Notify API. Unable to send email %O', err);

      throw new Error(`Calling Notify API. Unable to send email ${err}`);
    }
  },
};

export default notify;
