import { Context } from '.keystone/types'; // eslint-disable-line
import { InsuranceFeedbackVariables } from '../../types';
import sendEmail from '../../emails';

/**
 * creates feedback in database and sends email
 * adds createdAt timestamp to feedback
 * @param {Object} GraphQL root variables
 * @param {Object} GraphQL variables for the createInsuranceFeedback mutation
 * @param {Object} KeystoneJS context API
 * @returns {Object} with success true or false and response
 */
const createFeedback = async (root: any, variables: InsuranceFeedbackVariables, context: Context) => {
  console.info('Creating feedback');

  try {
    const feedback = {
      ...variables,
      createdAt: new Date(),
    };

    // adds feedback to database
    const response = await context.db.Feedback.createOne({
      data: feedback,
    });

    // sends email with relevant fields
    const emailResponse = await sendEmail.insuranceFeedbackEmail(feedback);

    // only if data added to db and email has successfully been sent - then return success as true
    if (response && emailResponse?.success) {
      return {
        ...response,
        success: true,
      };
    }

    return { success: false };
  } catch (err) {
    throw new Error(`Creating feedback: ${err}`);
  }
};

export default createFeedback;
