import { EMAIL_TEMPLATE_IDS } from '../../constants';
import fileSystem from '../../file-system';
import APIM from '../../integrations/APIM';
import { ApplicationSubmissionEmailVariables, ApimSendEmailHelperResponse } from '../../types';

const application = {
  /**
   * application.submittedEmail
   * Send "application submitted" email to an account
   * @param {ApplicationSubmissionEmailVariables} ApplicationSubmissionEmailVariables
   * @returns {Promise<ApimSendEmailHelperResponse>}
   */
  submittedEmail: async (variables: ApplicationSubmissionEmailVariables): Promise<ApimSendEmailHelperResponse> => {
    try {
      console.info('Sending application submitted email to application owner or provided business contact');

      const templateId = EMAIL_TEMPLATE_IDS.APPLICATION.SUBMISSION.EXPORTER.CONFIRMATION;

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

        const variablesWithFileBuffer = {
          ...variables,
          file: fileBuffer,
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
