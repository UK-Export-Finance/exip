import { TaskListDataTask, TaskListData } from '../../../../types';
import { GROUP_IDS, TASK_IDS } from '../../../constants';
import { TASKS } from '../../../content-strings';
import { getGroupById, getTaskById } from '../task-helpers';

const { PREPARE_APPLICATION } = TASKS.LIST;

/**
 * createPrepareApplicationTasks
 * @param {Array} otherGroups Task list groups
 * @returns {Array} Tasks
 */
const createPrepareApplicationTasks = (otherGroups: TaskListData): Array<TaskListDataTask> => {
  const initialChecksGroup = getGroupById(otherGroups, GROUP_IDS.INITIAL_CHECKS);

  const POLICY_TYPE_AND_EXPORTS = {
    href: '#',
    title: PREPARE_APPLICATION.TASKS.POLICY_TYPE_AND_EXPORTS,
    id: TASK_IDS.PREPARE_APPLICATION.POLICY_TYPE_AND_EXPORTS,
    fields: [],
    dependencies: [...getTaskById(initialChecksGroup.tasks, TASK_IDS.INITIAL_CHECKS.ELIGIBILITY).fields],
  };

  const EXPORTER_BUSINESS = {
    href: '#',
    title: PREPARE_APPLICATION.TASKS.EXPORTER_BUSINESS,
    id: TASK_IDS.PREPARE_APPLICATION.EXPORTER_BUSINESS,
    fields: [],
    dependencies: [...POLICY_TYPE_AND_EXPORTS.fields, ...POLICY_TYPE_AND_EXPORTS.dependencies],
  };

  const tasks = [
    POLICY_TYPE_AND_EXPORTS,
    EXPORTER_BUSINESS,
    {
      href: '#',
      title: PREPARE_APPLICATION.TASKS.BUYER,
      id: TASK_IDS.PREPARE_APPLICATION.BUYER,
      fields: ['temp'],
      dependencies: [...EXPORTER_BUSINESS.dependencies, ...EXPORTER_BUSINESS.fields],
    },
  ] as Array<TaskListDataTask>;

  return tasks;
};

export default createPrepareApplicationTasks;
