import getExpiringApplications from '../get-expiring-applications';
import applicationSubmissionDeadineEmail from './send-email';
import { Context, SuccessResponse } from '../../types';

/**
 * applicationSubmissionDeadlineEmail
 * finds applications which are expiring in 2 days
 * maps and generates email variables
 * sends email to those users if their application is expiring
 * @param {Object} KeystoneJS context API
 * @returns {Promise<SuccessResponse>} success response
 */
const applicationSubmissionDeadlineEmail = async (context: Context): Promise<SuccessResponse> => {
  try {
    console.info('Sending application submission deadline email');

    const applications = await getExpiringApplications(context);

    /**
     * if applications is populated
     * generates email variables for each application
     * sends email
     */
    if (applications.length) {
      const sentEmails = await applicationSubmissionDeadineEmail.send(applications);

      // totalExpiringApplications
      if (sentEmails.length === applications.length) {
        return {
          success: true,
        };
      }

      return {
        success: false,
      };
    }

    return {
      success: true,
    };
  } catch (err) {
    console.error('Error sending application submission deadline email (emailApplicationSubmissionDeadlineEmail helper) %O', err);
    throw new Error(`Sending application submission deadline email (emailApplicationSubmissionDeadlineEmail helper) ${err}`);
  }
};

export default applicationSubmissionDeadlineEmail;
