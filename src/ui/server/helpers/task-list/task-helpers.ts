import { ApplicationFlat, TaskListData, TaskListDataGroup, TaskListDataTask } from '../../../types';
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
 * hasSubmittedField
 * @param {Object} submittedData Submitted application data
 * @param {String} field ID of the field to get
 * @returns {Boolean} True if the field is in submittedData.
 */
// Note: this assumes that any data in submitted fields is a valid answer. E.g, false boolean is a valid answer.
export const hasSubmittedField = (submittedData: ApplicationFlat, fieldId: string) => {
  if (submittedData && fieldId && (submittedData[fieldId] || submittedData[fieldId] === false)) {
    return true;
  }

  return false;
};

/**
 * getSubmittedFields
 * @param {Array} fields Array of field ids
 * @param {Object} submittedData Submitted application data
 * @returns {Array} array of submitted field ids.
 */
export const getSubmittedFields = (fields: Array<string>, submittedData: ApplicationFlat): Array<string> => {
  const submittedFields = [] as Array<string>;

  if (fields) {
    fields.forEach((fieldId) => {
      if (hasSubmittedField(submittedData, fieldId)) {
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
export const taskIsInProgress = (taskFields: Array<string>, submittedData: ApplicationFlat) => {
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
export const taskIsComplete = (taskFields: Array<string>, submittedData: ApplicationFlat): boolean => {
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
export const areTaskDependenciesMet = (dependencies: Array<string>, submittedData: ApplicationFlat): boolean => {
  const totalDependencies = (dependencies && dependencies.length) || 0;

  let validDependencies = [];

  if (dependencies) {
    validDependencies = dependencies.filter((fieldId: string) => {
      if (hasSubmittedField(submittedData, fieldId)) {
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
export const taskStatus = (task: TaskListDataTask, submittedData: ApplicationFlat): string => {
  const { dependencies, fields } = task;

  const dependenciesMet = areTaskDependenciesMet(dependencies, submittedData);
  const isInProgress = taskIsInProgress(fields, submittedData);
  const isComplete = taskIsComplete(fields, submittedData);

  if (!dependenciesMet) {
    return TASKS.STATUS.CANNOT_START;
  }

  if (dependenciesMet && !isInProgress && !isComplete) {
    return TASKS.STATUS.NOT_STARTED_YET;
  }

  if (isInProgress) {
    return TASKS.STATUS.IN_PROGRESS;
  }

  if (isComplete) {
    return TASKS.STATUS.COMPLETED;
  }

  return '-';
};

/**
 * taskStatus
 * @param {String} link Link to the task
 * @param {String} status Status of the task
 * @returns {String} Task link if the status is not `cannot start`
 */
export const taskLink = (link: string, status: string): string | null => {
  if (status !== TASKS.STATUS.CANNOT_START) {
    return link;
  }

  return null;
};
