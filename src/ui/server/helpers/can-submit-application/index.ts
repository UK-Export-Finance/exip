import { isAfter } from 'date-fns';
import flattenApplicationData from '../flatten-application-data';
import applicationIsComplete from '../application-is-complete';
import { APPLICATION } from '../../constants';
import { Application } from '../../../types';

/**
 * canSubmitApplication
 * Check if the application is:
 * - Complete
 * - Has a draft status
 * - Is submitting before the submission deadline
 * - Has not been submitted before
 * @param {Application}
 * @returns {Boolean}
 */
const canSubmitApplication = (application: Application): boolean => {
  const { status, submissionCount, submissionDeadline } = application;

  // check the application is complete
  const flatApplicationData = flattenApplicationData(application);

  const isComplete = applicationIsComplete(flatApplicationData);

  // check the application status is in progress
  const isInProgress = status === APPLICATION.STATUS.IN_PROGRESS;

  // check that the current date is before the submission deadline
  const now = new Date();
  const validSubmissionDate = isAfter(new Date(submissionDeadline), now);

  // check that it has not been submitted before
  const isFirstSubmission = submissionCount === 0;

  if (isComplete && isInProgress && validSubmissionDate && isFirstSubmission) {
    return true;
  }

  return false;
};

export default canSubmitApplication;
