import { isAfter } from 'date-fns';
import flattenApplicationData from '../flatten-application-data';
import applicationIsComplete from '../application-is-complete';
import { APPLICATION } from '../../constants';
import { Application } from '../../../types';

const { IN_PROGRESS } = APPLICATION.STATUS;

/**
 * canSubmitApplication
 * Check if the application is:
 * - Is completed.
 * - Has an IN_PROGRESS status.
 * - Has a valid submission deadline.
 * - Has a submissionCount of 0.
 * @param {Application}
 * @returns {Boolean}
 */
const canSubmitApplication = (application: Application): boolean => {
  console.info('Checking if an application can be submitted (canSubmitApplication helper)');

  const { status, submissionCount, submissionDeadline } = application;

  // check the application is complete
  const flatApplicationData = flattenApplicationData(application);

  const isComplete = applicationIsComplete(flatApplicationData);

  if (!isComplete) {
    console.info('Unable to submit application - application is not complete (canSubmitApplication helper)');

    return false;
  }

  if (status !== IN_PROGRESS) {
    console.info(`Unable to submit application - application does not have an '${IN_PROGRESS}' status (canSubmitApplication helper)`);

    return false;
  }

  // check that the current date is before the submission deadline
  const now = new Date();

  const validSubmissionDeadline = isAfter(new Date(submissionDeadline), now);

  if (!validSubmissionDeadline) {
    console.info('Unable to submit application - invalid submission deadline (canSubmitApplication helper)');

    return false;
  }

  if (submissionCount !== 0) {
    console.info('Unable to submit application - application has already been submitted (canSubmitApplication helper)');

    return false;
  }

  console.info('Able to submit application - application is valid (canSubmitApplication helper)');

  return true;
};

export default canSubmitApplication;
