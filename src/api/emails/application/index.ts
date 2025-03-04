import dotenv from 'dotenv';
// @ts-ignore
import { NotifyClient } from 'notifications-node-client';
import getSubmittedConfirmationTemplateId from './get-submitted-confirmation-template-id';
import fileSystem from '../../file-system';
import APIM from '../../integrations/APIM';
import { ApplicationPolicy, ApplicationSubmissionEmailVariables, ApimSendEmailHelperResponse } from '../../types';

dotenv.config();

const notifyKey = process.env.GOV_NOTIFY_API_KEY;
const notifyClient = new NotifyClient(notifyKey);

const application = {
  /**
   * application.submittedEmail
   * Send "application submitted" email to an account
   * @param {ApplicationSubmissionEmailVariables} ApplicationSubmissionEmailVariables
   * @param { ApplicationPolicy } policy: Application policy
   * @returns {Promise<ApimSendEmailHelperResponse>}
   */
  submittedEmail: async (variables: ApplicationSubmissionEmailVariables, policy: ApplicationPolicy): Promise<ApimSendEmailHelperResponse> => {
    try {
      console.info('Sending application submitted email to application owner or provided business contact');

      const templateId = getSubmittedConfirmationTemplateId(policy);

      const { emailAddress } = variables;

      const response = await APIM.sendEmail(templateId, emailAddress, variables);

      return response;
    } catch (error) {
      console.error('Error sending application submitted email to to application owner or provided business contact %o', error);

      throw new Error(`Sending application submitted email to to application owner or provided business contact ${error}`);
    }
  },
  /**
   * application.underwritingTeam
   * Read XLSX file, generate a file buffer
   * Send "application submitted" email to the underwriting team with a link to XLSX
   * We send a file buffer to APIM - in turn, Notify generates a unique URL that is then rendered in the email.
   * @param {ApplicationSubmissionEmailVariables}
   * @returns {Promise<ApimSendEmailHelperResponse>}
   */
  underwritingTeam: async (variables: ApplicationSubmissionEmailVariables, filePath: string, templateId: string): Promise<ApimSendEmailHelperResponse> => {
    try {
      console.info('Sending application submitted email to underwriting team');

      const emailAddress = String(process.env.UNDERWRITING_TEAM_EMAIL);

      /**
       * NOTE: there is no need to handle any file system errors here.
       * if something errors, it will fall into the catch handler below.
       */
      const file = await fileSystem.readFile(filePath);

      if (file) {
        const fileBuffer = Buffer.from(file);

        // TODO: EMS-4213 revert changes
        const linkToFile = await notifyClient.prepareUpload(fileBuffer, { confirmEmailBeforeDownload: true });

        const variablesWithFileBuffer = {
          ...variables,
          linkToFile,
          // TODO: EMS-4213 renable file
          // file: fileBuffer,
        };

        const response = await APIM.sendEmail(templateId, emailAddress, variablesWithFileBuffer);

        /**
         * NOTE: no need to handle an error from fs.unlink here.
         * If this errors, it will go into the catch handler below.
         */
        await fileSystem.unlink(filePath);

        return response;
      }

      throw new Error('Sending application submitted email to underwriting team - invalid file / file not found');
    } catch (error) {
      console.error('Error sending application submitted email to underwriting team %o', error);

      throw new Error(`Sending application submitted email to underwriting team ${error}`);
    }
  },
};

export default application;
