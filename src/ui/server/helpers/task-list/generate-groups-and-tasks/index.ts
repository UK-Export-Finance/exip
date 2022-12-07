import { TaskListData } from '../../../../types';
import initialChecksTasks from './initial-checks';
import prepareApplicationTasks from './prepare-application';
import submitApplicationTasks from './submit-application';
import { TASKS } from '../../../content-strings';
import { GROUP_IDS } from '../../../constants';

const { INITIAL_CHECKS, PREPARE_APPLICATION, SUBMIT_APPLICATION } = TASKS.LIST;

/**
 * generateGroupsAndTasks
 * @returns {Array} Task list groups and tasks
 */
const generateGroupsAndTasks = (applicationReferenceNumber: number): TaskListData => {
  let groups = [
    {
      title: INITIAL_CHECKS.HEADING,
      id: GROUP_IDS.INITIAL_CHECKS,
      tasks: initialChecksTasks(),
    },
  ] as TaskListData;

  groups = [
    ...groups,
    {
      title: PREPARE_APPLICATION.HEADING,
      id: GROUP_IDS.PREPARE_APPLICATION,
      tasks: prepareApplicationTasks(applicationReferenceNumber, groups),
    },
  ] as TaskListData;

  groups = [
    ...groups,
    {
      title: SUBMIT_APPLICATION.HEADING,
      id: GROUP_IDS.SUBMIT_APPLICATION,
      tasks: submitApplicationTasks(groups),
    },
  ] as TaskListData;

  return groups;
};

export default generateGroupsAndTasks;
