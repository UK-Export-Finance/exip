import { EMAIL_TEMPLATE_IDS } from '../../constants';
import APIM from '../../integrations/APIM';
import { ApimSendEmailHelperResponse, SubmissionDeadlineEmailVariables } from '../../types';

/**
 * submissionDeadlineEmail
 * Send the submission deadline email
 * @param {String} Email address
 * @param {SubmissionDeadlineEmailVariables} submissionDeadlineEmailVariables
 * @returns {Promise<ApimSendEmailHelperResponse>}
 */
export const submissionDeadlineEmail = async (
  emailAddress: string,
  submissionDeadlineEmailVariables: SubmissionDeadlineEmailVariables,
): Promise<ApimSendEmailHelperResponse> => {
  try {
    console.info('Sending submission deadline reminder email for %s', submissionDeadlineEmailVariables.referenceNumber);

    const templateId = EMAIL_TEMPLATE_IDS.APPLICATION.SUBMISSION.DEADLINE_REMINDER;

    const response = await APIM.sendEmail(templateId, emailAddress, submissionDeadlineEmailVariables);

    return response;
  } catch (error) {
    console.error('Error sending submission deadline email for applicationId %s - %o', submissionDeadlineEmailVariables.referenceNumber, error);

    throw new Error(`Sending submission deadline email for ${submissionDeadlineEmailVariables.referenceNumber} - ${error}`);
  }
};
