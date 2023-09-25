import { DEFAULT, TASKS } from '../../content-strings';
import { isPopulatedArray } from '../array';
import { ApplicationFlat, TaskListData, TaskListDataGroup, TaskListDataTask } from '../../../types';
import sectionIsComplete from '../section-status/is-complete';
import sectionIsInProgress from '../section-status/in-progress';
import { hasSubmittedField } from '../get-submitted-fields';

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
 * getAllTasksFieldsInAGroup
 * @param {Object} group Task list group
 * @returns {Array} All field IDs from all tasks in the provided group. Flattens the task fields into a 1 level array.
 */
export const getAllTasksFieldsInAGroup = (group: TaskListDataGroup): Array<string> => {
  if (isPopulatedArray(group.tasks)) {
    return group.tasks.map((task: TaskListDataTask) => task.fields).flat();
  }

  return [];
};

/**
 * areTaskDependenciesMet
 * @param {Array} dependencies Array of dependency ids
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
  const isInProgress = sectionIsInProgress(fields, submittedData);
  const isComplete = sectionIsComplete(fields, submittedData);

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

  return DEFAULT.EMPTY;
};

/**
 * taskStatus
 * @param {String} link Link to the task
 * @param {String} status Status of the task
 * @returns {String} Task link if the status is not `cannot start`
 */
export const taskLink = (link: string, status: string): string | null => (status === TASKS.STATUS.CANNOT_START ? null : link);
