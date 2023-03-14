import { TaskListData } from '../../../../types';
import initialChecksTasks from './initial-checks';
import prepareApplicationTasks from './prepare-application';
import submitApplicationTasks from './submit-application';
import { TASKS } from '../../../content-strings';
import { GROUP_IDS } from '../../../constants';

const { INITIAL_CHECKS, PREPARE_APPLICATION, SUBMIT_APPLICATION } = TASKS.LIST;

/**
 * generateGroupsAndTasks
 * @param {Number} Application reference number
 * @param {String} Application policy type
 * @returns {Array} Task list groups and tasks
 */
const generateGroupsAndTasks = (referenceNumber: number, policyType?: string, isUsingBroker?: string): TaskListData => {
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
      tasks: prepareApplicationTasks(referenceNumber, groups, policyType, isUsingBroker),
    },
  ] as TaskListData;

  groups = [
    ...groups,
    {
      title: SUBMIT_APPLICATION.HEADING,
      id: GROUP_IDS.SUBMIT_APPLICATION,
      tasks: submitApplicationTasks(referenceNumber, groups),
    },
  ] as TaskListData;

  return groups;
};

export default generateGroupsAndTasks;
