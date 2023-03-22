import { DEFAULT, TASKS } from '../../content-strings';
import { Application } from '../../../types';
import sectionIsComplete from './is-complete';
import sectionIsInProgress from './in-progress';
import flattenApplicationData from '../flatten-application-data';

/**
 * sectionStatus
 * @param {Object} task Task data object
 * @param {Object} submittedData Submitted application data
 * @returns {String} Task status - cannot start/start now/in progress/completed
 */
export const sectionStatus = (fields: Array<string>, application: Application): string => {
  const submittedData = flattenApplicationData(application);

  const isInProgress = sectionIsInProgress(fields, submittedData);
  const isComplete = sectionIsComplete(fields, submittedData);

  if (isInProgress) {
    return TASKS.STATUS.IN_PROGRESS;
  }

  if (isComplete) {
    return TASKS.STATUS.COMPLETED;
  }

  return DEFAULT.EMPTY;
};

export default sectionStatus;
