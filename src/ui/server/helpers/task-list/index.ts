import { taskStatus } from './task-helpers';
import { TaskListData, TaskListDataTask, TaskListGroup, SubmittedData } from '../../../types';

/**
 * generateTaskStates
 * @param {Object} taskListData Task lists groups and tasks
 * @param {Object} submittedData Submitted application data
 * @returns {Object} Task lists groups and tasks with added task statuses.
 */
const generateTaskStates = (taskListData: TaskListData, submittedData: SubmittedData): TaskListData => {
  const tasksList = taskListData;

  const groupKeys = Object.keys(tasksList);

  groupKeys.forEach((groupKey: string) => {
    const group = tasksList[groupKey];

    const groupTaskKeys = Object.keys(group.tasks);

    groupTaskKeys.forEach((taskKey: string) => {
      const task = group.tasks[taskKey];

      const taskWithState = {
        href: task.href,
        title: task.title,
        id: task.id,
        status: taskStatus(task, submittedData),
      };

      group.tasks[taskKey] = taskWithState;
    });
  });

  return tasksList;
};

/**
 * generateSimplifiedTaskList
 * @param {Object} taskList Task lists groups and tasks
 * @returns {Array} Array of groups and tasks with only the data required for UI consumption.
 */
const generateSimplifiedTaskList = (taskList: TaskListData): Array<TaskListGroup> => {
  const groups = Object.values(taskList);

  return groups.map((group) => {
    const groupTasks = Object.values(group.tasks);

    const mapped = {
      title: group.title,
      tasks: groupTasks.map((task: TaskListDataTask) => ({
        id: task.id,
        href: task.href,
        status: task.status,
        title: task.title,
      })),
    } as TaskListGroup;

    return mapped;
  });
};

/**
 * generateTaskList
 * @param {Object} groupsAndTasks Initial groups with tasks
 * @param {Object} submittedData Submitted application data
 * @returns {Array} generateSimplifiedTaskList- Array of groups and tasks with only the data required for UI consumption.
 */
const generateTaskList = (groupsAndTasks: TaskListData, submittedData: SubmittedData): Array<TaskListGroup> => {
  // add task states (status etc)
  const withState = generateTaskStates(groupsAndTasks, submittedData);

  // simplify and map the data structure into an array of objects for UI component consumption.
  const simplifiedTaskList = generateSimplifiedTaskList(withState);

  return simplifiedTaskList;
};

export default generateTaskList;
