import { isAfter } from 'date-fns';
import flattenApplicationData from '../flatten-application-data';
import applicationIsComplete from '../application-is-complete';
import { APPLICATION } from '../../constants';
import { Application } from '../../../types';

/**
 * canSubmitApplication
 * Check if the application is complete, has a draft status and is submitting before the submission deadline
 * @param {Object} Application
 * @returns {Boolean}
 */
const canSubmitApplication = (application: Application): boolean => {
  const { status, submissionDeadline } = application;

  // check the application is complete
  const flatApplicationData = flattenApplicationData(application);
  const isComplete = applicationIsComplete(flatApplicationData);

  // check the application status is draft
  const hasDraftStatus = status === APPLICATION.STATUS.DRAFT;

  // check the current date vs submission deadline
  const now = new Date();
  const validSubmissionDate = isAfter(new Date(submissionDeadline), now);

  if (isComplete && hasDraftStatus && validSubmissionDate) {
    return true;
  }

  return false;
};

export default canSubmitApplication;
