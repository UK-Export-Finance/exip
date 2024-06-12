import { EMAIL_TEMPLATE_IDS } from '../../constants';
import fileSystem from '../../file-system';
import { callNotify } from '../call-notify';
import { ApplicationSubmissionEmailVariables, EmailResponse } from '../../types';

const application = {
  /**
   * application.submittedEmail
   * Send "application submitted" email to an account
   * @param {ApplicationSubmissionEmailVariables} ApplicationSubmissionEmailVariables
   * @returns {Promise<Object>} callNotify response
   */
  submittedEmail: async (variables: ApplicationSubmissionEmailVariables): Promise<EmailResponse> => {
    try {
      console.info('Sending application submitted email to application owner or provided business contact');

      const templateId = EMAIL_TEMPLATE_IDS.APPLICATION.SUBMISSION.EXPORTER.CONFIRMATION;

      const { emailAddress } = variables;

      const response = await callNotify(templateId, emailAddress, variables);

      return response;
    } catch (err) {
      console.error('Error sending application submitted email to to application owner or provided business contact %O', err);

      throw new Error(`Sending application submitted email to to application owner or provided business contact ${err}`);
    }
  },
  /**
   * application.underwritingTeam
   * Read CSV file, generate a file buffer
   * Send "application submitted" email to the underwriting team with a link to CSV
   * We send a file buffer to Notify and Notify generates a unique URL that is then rendered in the email.
   * @param {ApplicationSubmissionEmailVariables}
   * @returns {Promise<Object>} callNotify response
   */
  underwritingTeam: async (variables: ApplicationSubmissionEmailVariables, filePath: string, templateId: string): Promise<EmailResponse> => {
    try {
      console.info('Sending application submitted email to underwriting team');

      const emailAddress = String(process.env.UNDERWRITING_TEAM_EMAIL);

      // NOTE: no need to handle any file system errors here.
      // if something errors, it will fall into the catch handler below.
      const file = await fileSystem.readFile(filePath);

      if (file) {
        const fileBuffer = Buffer.from(file);

        const response = await callNotify(templateId, emailAddress, variables, fileBuffer);

        /**
         * NOTE: no need to handle an error from fs.unlink here.
         * If this errors, it will go into the catch handler below.
         */
        // await fileSystem.unlink(filePath);

        return response;
      }

      throw new Error('Sending application submitted email to underwriting team - invalid file / file not found');
    } catch (err) {
      console.error('Error sending application submitted email to underwriting team %O', err);

      throw new Error(`Sending application submitted email to underwriting team ${err}`);
    }
  },
};

export default application;
