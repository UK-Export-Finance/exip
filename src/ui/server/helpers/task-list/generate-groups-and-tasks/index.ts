import { TaskListData } from '../../../../types';
import initialChecksTasks from './initial-checks';
import prepeApplicationTasks from './prepare-application';
import { TASKS } from '../../../content-strings';

/**
 * generateGroupsAndTasks
 * @returns {Object} Task lists groups and tasks
 */
const generateGroupsAndTasks = (): TaskListData => {
  const groups = {} as TaskListData;

  groups.INITIAL_CHECKS = {
    title: TASKS.LIST.INITIAL_CHECKS.TITLE,
    tasks: initialChecksTasks(),
  };

  groups.PREPARE_APPLICATION = {
    title: TASKS.LIST.PREPARE_APPLICATION.TITLE,
    tasks: prepeApplicationTasks(groups),
  };

  return groups;
};

export default generateGroupsAndTasks;
