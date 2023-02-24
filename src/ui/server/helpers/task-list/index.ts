import { taskStatus, taskLink } from './task-helpers';
import { TaskListData, TaskListDataTask, TaskListGroup, ApplicationFlat } from '../../../types';

/**
 * generateTaskStatusesAndLinks
 * @param {Array} taskListData Task list groups and tasks
 * @param {Object} submittedData Submitted application data
 * @returns {Object} Task list groups and tasks with added statuses and links.
 */
export const generateTaskStatusesAndLinks = (taskListData: TaskListData, submittedData: ApplicationFlat): TaskListData => {
  console.log(submittedData);
  const tasksList = taskListData.map((group) => {
    return {
      ...group,
      tasks: group.tasks.map((task) => {
        const status = taskStatus(task, submittedData);

        return {
          ...task,
          status,
          href: taskLink(task.href, status),
        };
      }),
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
const generateTaskList = (groupsAndTasks: TaskListData, submittedData: ApplicationFlat): Array<TaskListGroup> => {
  // add task statuses and links
  const withStatusesAndLinks = generateTaskStatusesAndLinks(groupsAndTasks, submittedData);

  // simplify and map the data structure into an array of objects for UI component consumption.
  const simplifiedTaskList = generateSimplifiedTaskList(withStatusesAndLinks);

  return simplifiedTaskList;
};

export default generateTaskList;
