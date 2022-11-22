import { TaskListDataTask, TaskListData } from '../../../../types';
import { GROUP_IDS, TASK_IDS } from '../../../constants';
import { TASKS } from '../../../content-strings';
import { getGroupById, getTaskById } from '../task-helpers';

/**
 * createSubmitApplicationTasks
 * @param {Array} otherGroups Task list groups
 * @returns {Array} Tasks
 */
const createSubmitApplicationTasks = (otherGroups: TaskListData): Array<TaskListDataTask> => {
  const initialChecksGroup = getGroupById(otherGroups, GROUP_IDS.INITIAL_CHECKS);
  const prepareApplicationGroup = getGroupById(otherGroups, GROUP_IDS.PREPARE_APPLICATION);

  const DECLARATIONS = {
    href: '#',
    title: TASKS.LIST.SUBMIT_APPLICATION.TASKS.DECLARATIONS,
    id: TASK_IDS.SUBMIT_APPLICATION.DECLARATIONS,
    fields: ['temp'],
    dependencies: [
      ...getTaskById(initialChecksGroup.tasks, TASK_IDS.INITIAL_CHECKS.ELIGIBILITY).fields,
      ...getTaskById(prepareApplicationGroup.tasks, TASK_IDS.PREPARE_APPLICATION.POLICY_TYPE_AND_EXPORTS).fields,
      ...getTaskById(prepareApplicationGroup.tasks, TASK_IDS.PREPARE_APPLICATION.EXPORTER_BUSINESS).fields,
      ...getTaskById(prepareApplicationGroup.tasks, TASK_IDS.PREPARE_APPLICATION.BUYER).fields,
    ],
  };

  const CHECK_ANSWERS_AND_SUBMIT = {
    href: '#',
    title: TASKS.LIST.SUBMIT_APPLICATION.TASKS.CHECK_ANSWERS_AND_SUBMIT,
    id: TASK_IDS.SUBMIT_APPLICATION.CHECK_ANSWERS_AND_SUBMIT,
    fields: [],
    dependencies: [...DECLARATIONS.fields, ...DECLARATIONS.dependencies],
  };

  const tasks = [DECLARATIONS, CHECK_ANSWERS_AND_SUBMIT] as Array<TaskListDataTask>;

  return tasks;
};

export default createSubmitApplicationTasks;
