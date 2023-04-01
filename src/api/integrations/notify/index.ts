import dotenv from 'dotenv';
// @ts-ignore
import { NotifyClient } from 'notifications-node-client';
import { NotifyPeronsalisation } from '../../types';

dotenv.config();

const notifyKey = process.env.GOV_NOTIFY_API_KEY;
const notifyClient = new NotifyClient(notifyKey);

const notify = {
  sendEmail: async (templateId: string, sendToEmailAddress: string, variables: object, file?: Buffer, fileIsCsv?: boolean) => {
    try {
      console.info('Calling Notify API. templateId: ', templateId);

      const personalisation = variables as NotifyPeronsalisation;

      if (file) {
        personalisation.linkToFile = await notifyClient.prepareUpload(file, { confirmEmailBeforeDownload: true, isCsv: fileIsCsv });

        await notifyClient.sendEmail(templateId, sendToEmailAddress, {
          personalisation,
          reference: null,
        });
      } else {
        await notifyClient.sendEmail(templateId, sendToEmailAddress, {
          personalisation,
          reference: null,
        });
      }

      return {
        success: true,
        emailRecipient: sendToEmailAddress,
      };
    } catch (err) {
      throw new Error(`Calling Notify API. Unable to send email ${err}`);
    }
  },
};

export default notify;
