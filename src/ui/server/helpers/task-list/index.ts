import { taskStatus } from './task-helpers';
import { TaskListData, TaskListDataTask, TaskListGroup, SubmittedData } from '../../../types';

/**
 * generateTaskStatuses
 * @param {Array} taskListData Task list groups and tasks
 * @param {Object} submittedData Submitted application data
 * @returns {Object} Task list groups and tasks with added task statuses.
 */
export const generateTaskStatuses = (taskListData: TaskListData, submittedData: SubmittedData): TaskListData => {
  const tasksList = taskListData.map((group) => {
    return {
      ...group,
      tasks: group.tasks.map((task) => ({
        ...task,
        status: taskStatus(task, submittedData),
      })),
    };
  }) as TaskListData;

  return tasksList;
};

/**
 * generateSimplifiedTaskList
 * @param {Array} taskList Task list groups and tasks
 * @returns {Array} Array of groups and tasks with only the data required for UI consumption.
 */
export const generateSimplifiedTaskList = (taskList: TaskListData): Array<TaskListGroup> => {
  return taskList.map(
    (group) =>
      ({
        title: group.title,
        tasks: group.tasks.map((task: TaskListDataTask) => ({
          id: task.id,
          href: task.href,
          status: task.status,
          title: task.title,
        })),
      } as TaskListGroup),
  );
};

/**
 * generateTaskList
 * @param {Array} groupsAndTasks Initial groups with tasks
 * @param {Object} submittedData Submitted application data
 * @returns {Array} generateSimplifiedTaskList- Array of groups and tasks with only the data required for UI consumption.
 */
const generateTaskList = (groupsAndTasks: TaskListData, submittedData: SubmittedData): Array<TaskListGroup> => {
  // add task statuses
  const withStatuses = generateTaskStatuses(groupsAndTasks, submittedData);

  // simplify and map the data structure into an array of objects for UI component consumption.
  const simplifiedTaskList = generateSimplifiedTaskList(withStatuses);

  return simplifiedTaskList;
};

export default generateTaskList;
