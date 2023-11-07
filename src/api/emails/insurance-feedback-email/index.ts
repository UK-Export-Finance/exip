import dotenv from 'dotenv';
import { callNotify } from '../call-notify';
import { EMAIL_TEMPLATE_IDS } from '../../constants';
import formatDate from '../../helpers/format-date';
import mapFeedbackSatisfaction from '../../helpers/map-feedback-satisfaction';
import { InsuranceFeedbackVariables, EmailResponse } from '../../types';

dotenv.config();

/**
 * insuranceFeedbackEmail
 * sends email for insurance feedback
 * @param {InsuranceFeedbackVariables} variables
 * @returns {Object} callNotify response
 */
export const insuranceFeedbackEmail = async (variables: InsuranceFeedbackVariables): Promise<EmailResponse> => {
  try {
    console.info('Sending insurance feedback email');

    const templateId = EMAIL_TEMPLATE_IDS.FEEDBACK.INSURANCE;

    const emailAddress = process.env.FEEDBACK_EMAIL_RECIPIENT as string;

    const emailVariables = variables;
    // blank variables for date and time (used if createdAt is not populated)
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

    const response = await callNotify(templateId, emailAddress, emailVariables);

    return response;
  } catch (err) {
    console.error('Error sending insurance feedback email %O', err);

    throw new Error(`Sending insurance feedback email ${err}`);
  }
};
