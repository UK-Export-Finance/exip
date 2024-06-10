import mapApplicationSubmissionDeadlineVariables from '../../map-application-submission-deadline-variables';
import sendEmail from '../../../emails';
import { Application } from '../../../types';

/**
 * send
 * generates an array of promises to send submission deadline emails
 * resolves all promises and logs the number of emails sent
 * @param {Array<Application>} applications: Array of applications
 * @returns {Promise<void>} application submission deadline emails sent
 */
const send = async (applications: Array<Application>): Promise<void> => {
  const promises = applications.map(async (application) => {
    const variables = mapApplicationSubmissionDeadlineVariables(application);

    return sendEmail.submissionDeadlineEmail(variables.email, variables);
  });

  return Promise.all(promises)
    .then((sent) => {
      console.info('Application submission deadline emails sent: ', sent.length);
    })
    .catch((err) => {
      console.error('Error sending application submission deadline email (sendEmail.submissionDeadlineEmail) %O', err);
      throw new Error(`Sending application submission deadline email (sendEmail.submissionDeadlineEmail) ${err}`);
    });
};

const applicationSubmissionDeadineEmail = {
  send,
};

export default applicationSubmissionDeadineEmail;
