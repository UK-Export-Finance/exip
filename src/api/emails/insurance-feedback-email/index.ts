import dotenv from 'dotenv';
import APIM from '../../integrations/APIM';
import { EMAIL_TEMPLATE_IDS } from '../../constants';
import formatDate from '../../helpers/format-date';
import mapFeedbackSatisfaction from '../../helpers/map-feedback-satisfaction';
import { InsuranceFeedbackVariables, ApimSendEmailHelperResponse } from '../../types';

dotenv.config();

/**
 * insuranceFeedbackEmail
 * sends email for insurance feedback
 * @param {InsuranceFeedbackVariables} variables
 * @returns {Promise<ApimSendEmailHelperResponse>}
 */
export const insuranceFeedbackEmail = async (variables: InsuranceFeedbackVariables): Promise<ApimSendEmailHelperResponse> => {
  try {
    console.info('Sending insurance feedback email');

    const templateId = EMAIL_TEMPLATE_IDS.FEEDBACK.INSURANCE;

    const emailAddress = process.env.FEEDBACK_EMAIL_RECIPIENT as string;

    const emailVariables = variables;

    // empty variables for date and time (used if createdAt is not populated)
    emailVariables.time = '';
    emailVariables.date = '';

    // formats the createdAt timestamp into date and time for email template
    if (variables.createdAt) {
      emailVariables.date = formatDate(variables.createdAt);
      emailVariables.time = formatDate(variables.createdAt, 'HH:mm:ss');
    }

    // if satisfaction variable exists, then map to formatted email field
    if (variables.satisfaction) {
      emailVariables.satisfaction = mapFeedbackSatisfaction(variables.satisfaction);
    }

    const response = await APIM.sendEmail(templateId, emailAddress, emailVariables);

    return response;
  } catch (error) {
    console.error('Error sending insurance feedback email %o', error);

    throw new Error(`Sending insurance feedback email ${error}`);
  }
};
