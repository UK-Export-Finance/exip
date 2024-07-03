import mapApplicationSubmissionDeadlineVariables from '../../map-application-submission-deadline-variables';
import sendEmail from '../../../emails';
import { Application } from '../../../types';

/**
 * send
 * generates an array of promises to send submission deadline emails
 * resolves all promises and logs the number of emails sent
 * @param {Array<Application>} applications: Array of applications
 * @returns {Array<Promise>} application submission deadline emails sent
 */
const send = async (applications: Array<Application>) => {
  try {
    console.info('Sending application submission deadline emails - send helper');

    const mapped = applications.map(async (application) => {
      const variables = mapApplicationSubmissionDeadlineVariables(application);

      return sendEmail.submissionDeadlineEmail(variables.email, variables);
    });

    const promises = await Promise.all(mapped);

    return promises;
  } catch (err) {
    console.error('Error sending application submission deadline email (send helper) %O', err);
    throw new Error(`Sending application submission deadline email (send helper) ${err}`);
  }
};

const applicationSubmissionDeadineEmail = {
  send,
};

export default applicationSubmissionDeadineEmail;
