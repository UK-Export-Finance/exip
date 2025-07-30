import { FEEDBACK } from '../../constants';

/**
 * mapFeedbackSatisfaction
 * maps satisfaction value from user selection
 * returns formatted text value for email
 * @param {string} satisfaction
 * @returns {string} mapped satisfaction email text
 */
const mapFeedbackSatisfaction = (satisfaction: string) => FEEDBACK.EMAIL_TEXT[satisfaction];

export default mapFeedbackSatisfaction;
