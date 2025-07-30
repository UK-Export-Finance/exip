import sectionIsComplete from './is-complete';
import sectionIsInProgress from './in-progress';
import flattenApplicationData from '../flatten-application-data';
import { DEFAULT, TASKS } from '../../content-strings';
import { Application } from '../../../types';

/**
 * sectionStatus
 * @param {Array} requiredFields Task data object
 * @param {object} application Submitted application data
 * @returns {string} Task status - cannot start/start now/in progress/completed
 */
export const sectionStatus = (requiredFields: Array<string>, application: Application): string => {
  const submittedData = flattenApplicationData(application);

  const isInProgress = sectionIsInProgress(requiredFields, submittedData);
  const isComplete = sectionIsComplete(requiredFields, submittedData);

  if (isInProgress) {
    return TASKS.STATUS.IN_PROGRESS;
  }

  if (isComplete) {
    return TASKS.STATUS.COMPLETED;
  }

  return DEFAULT.EMPTY;
};

export default sectionStatus;
