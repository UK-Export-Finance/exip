import { TaskListDataTask, TaskListData } from '../../../../types';
import { GROUP_IDS, ROUTES, TASK_IDS } from '../../../constants';
import { TASKS } from '../../../content-strings';
import { getGroupById, getTaskById } from '../task-helpers';

// NOTE: task list structure is temporary until design is final.
// This is just an example.
/**
 * createPrepareApplicationTasks
 * @param {Array} otherGroups Task list groups
 * @returns {Array} Tasks
 */
const createPrepareApplicationTasks = (otherGroups: TaskListData): Array<TaskListDataTask> => {
  const initialChecksGroup = getGroupById(otherGroups, GROUP_IDS.INITIAL_CHECKS);

  const POLICY_TYPE = {
    href: ROUTES.QUOTE.POLICY_TYPE,
    title: TASKS.LIST.PREPARE_APPLICATION.TASKS.POLICY_TYPE,
    id: TASK_IDS.PREPARE_APPLICATION.POLICY_TYPE,
    fields: [],
    dependencies: [
      ...getTaskById(initialChecksGroup.tasks, TASK_IDS.INITIAL_CHECKS.ELIGIBILITY).fields,
      ...getTaskById(initialChecksGroup.tasks, TASK_IDS.INITIAL_CHECKS.CONTACT_DETAILS).fields,
    ],
  };

  const EXPORTS_TO_INSURE = {
    href: '#',
    title: TASKS.LIST.PREPARE_APPLICATION.TASKS.EXPORTS_TO_INSURE,
    id: TASK_IDS.PREPARE_APPLICATION.EXPORTS_TO_INSURE,
    fields: [],
    dependencies: [...POLICY_TYPE.fields, ...POLICY_TYPE.dependencies],
  };

  const tasks = [
    POLICY_TYPE,
    EXPORTS_TO_INSURE,
    {
      href: '#',
      title: TASKS.LIST.PREPARE_APPLICATION.TASKS.ABOUT_BUSINESS,
      id: TASK_IDS.PREPARE_APPLICATION.ABOUT_BUSINESS,
      fields: [],
      dependencies: [...EXPORTS_TO_INSURE.dependencies, ...EXPORTS_TO_INSURE.fields],
    },
    {
      href: '#',
      title: TASKS.LIST.PREPARE_APPLICATION.TASKS.BUYER,
      id: TASK_IDS.PREPARE_APPLICATION.BUYER,
      fields: [],
      dependencies: [],
    },
  ] as Array<TaskListDataTask>;

  return tasks;
};

export default createPrepareApplicationTasks;
