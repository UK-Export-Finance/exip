import { SubmittedDataInsuranceEligibility, TaskListData, TaskListDataGroup, TaskListDataTask } from '../../../types';
import { TASKS } from '../../content-strings';

/**
 * getTaskById
 * @param {Array} groups Task list groups
 * @param {String} groupId ID of the group to get
 * @returns {Object} Group
 */
export const getGroupById = (groups: TaskListData, groupId: string): TaskListDataGroup =>
  groups.find((group: TaskListDataGroup) => group.id === groupId) as TaskListDataGroup;

/**
 * getTaskById
 * @param {Array} groupTasks Tasks in a group
 * @param {String} taskId ID of the task to get
 * @returns {Object} Task
 */
export const getTaskById = (groupTasks: Array<TaskListDataTask>, taskId: string): TaskListDataTask =>
  groupTasks.find((task: TaskListDataTask) => task.id === taskId) as TaskListDataTask;

/**
 * getSubmittedFields
 * @param {Array} fields Array of field ids
 * @param {Object} submittedData Submitted application data
 * @returns {Array} array of submitted field ids.
 */
export const getSubmittedFields = (fields: Array<string>, submittedData: SubmittedDataInsuranceEligibility): Array<string> => {
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
export const taskIsInProgress = (taskFields: Array<string>, submittedData: SubmittedDataInsuranceEligibility) => {
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
export const taskIsComplete = (taskFields: Array<string>, submittedData: SubmittedDataInsuranceEligibility): boolean => {
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
export const areTaskDependenciesMet = (dependencies: Array<string>, submittedData: SubmittedDataInsuranceEligibility): boolean => {
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
export const taskStatus = (task: TaskListDataTask, submittedData: SubmittedDataInsuranceEligibility): string => {
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

  return '-';
};
