import { SubmittedData, TaskListDataTask } from '../../../types';
import { TASKS } from '../../content-strings';

/**
 * getSubmittedFields
 * @param {Array} fields Array of field ids
 * @param {Object} submittedData Submitted application data
 * @returns {Array} array of submitted field ids.
 */
export const getSubmittedFields = (fields: Array<string>, submittedData: SubmittedData): Array<string> => {
  const submittedFields = [] as Array<string>;

  if (fields) {
    fields.forEach((fieldId) => {
      if (submittedData && submittedData[fieldId]) {
        submittedFields.push(fieldId);
      }
    });
  }

  return submittedFields;
};

/**
 * taskIsInProgress
 * @param {Array} taskFields Array of field ids associated with the tak
 * @param {Object} submittedData Submitted application data
 * @returns {Boolean}
 */
export const taskIsInProgress = (taskFields: Array<string>, submittedData: SubmittedData) => {
  const submittedFields = getSubmittedFields(taskFields, submittedData);

  if (submittedFields.length > 0 && submittedFields.length < taskFields.length) {
    return true;
  }

  return false;
};

/**
 * taskIsComplete
 * @param {Array} taskFields Array of field ids associated with the tak
 * @param {Object} submittedData Submitted application data
 * @returns {Boolean}
 */
export const taskIsComplete = (taskFields: Array<string>, submittedData: SubmittedData): boolean => {
  const submittedFields = getSubmittedFields(taskFields, submittedData);

  if (submittedFields && submittedFields.length && taskFields && taskFields.length) {
    if (submittedFields.length === taskFields.length) {
      return true;
    }
  }

  return false;
};

/**
 * areTaskDependenciesMet
 * @param {Array} dependencies Array of depedency ids
 * @param {Object} submittedData Submitted application data
 * @returns {Boolean}
 */
export const areTaskDependenciesMet = (dependencies: Array<string>, submittedData: SubmittedData): boolean => {
  const totalDependencies = (dependencies && dependencies.length) || 0;

  let validDependencies = [];

  if (dependencies) {
    validDependencies = dependencies.filter((fieldId: string) => {
      if (submittedData && submittedData[fieldId]) {
        return fieldId;
      }
      return null;
    });
  }

  const allDepsMet = validDependencies.length === totalDependencies;

  if (allDepsMet) {
    return true;
  }

  return false;
};

/**
 * taskStatus
 * @param {Object} task Task data object
 * @param {Object} submittedData Submitted application data
 * @returns {String} Task status - cannot start/start now/in progress/completed
 */
export const taskStatus = (task: TaskListDataTask, submittedData: SubmittedData): string => {
  const { dependencies, fields } = task;

  const dependenciesMet = areTaskDependenciesMet(dependencies, submittedData);
  const isInProgress = taskIsInProgress(fields, submittedData);
  const isComplete = taskIsComplete(fields, submittedData);

  if (!dependenciesMet) {
    return TASKS.STATUS.CANNOT_START;
  }

  if (dependenciesMet && !isInProgress && !isComplete) {
    return TASKS.STATUS.START_NOW;
  }

  if (isInProgress) {
    return TASKS.STATUS.IN_PROGRESS;
  }

  if (isComplete) {
    return TASKS.STATUS.COMPLETED;
  }

  return '';
};
