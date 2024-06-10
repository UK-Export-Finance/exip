import { EMAIL_TEMPLATE_IDS } from '../../constants';
import { callNotify } from '../call-notify';
import { EmailResponse, SubmissionDeadlineEmailVariables } from '../../types';

/**
 * submissionDeadlineEmail
 * Send the submission deadline email
 * @param {String} Email address
 * @param {SubmissionDeadlineEmailVariables} submissionDeadlineEmailVariables
 * @returns {Promise<Object>} callNotify response
 */
export const submissionDeadlineEmail = async (
  emailAddress: string,
  submissionDeadlineEmailVariables: SubmissionDeadlineEmailVariables,
): Promise<EmailResponse> => {
  try {
    console.info('Sending access code email for account sign in');

    const templateId = EMAIL_TEMPLATE_IDS.APPLICATION.SUBMISSION.DEADLINE;

    const response = await callNotify(templateId, emailAddress, submissionDeadlineEmailVariables);

    return response;
  } catch (err) {
    console.error('Error sending submission deadline email %O', err);

    throw new Error(`Sending submission deadline email ${err}`);
  }
};
