import { TaskListDataTask, TaskListData } from '../../../../types';
import { GROUP_IDS, TASK_IDS, ROUTES } from '../../../constants';
import { TASKS } from '../../../content-strings';
import { getGroupById, getTaskById } from '../task-helpers';

const { SUBMIT_APPLICATION } = TASKS.LIST;

const { INSURANCE } = ROUTES;
const {
  INSURANCE_ROOT,
  CHECK_YOUR_ANSWERS: { ELIGIBILITY },
} = INSURANCE;

/**
 * createSubmitApplicationTasks
 * @param {Array} otherGroups Task list groups
 * @returns {Array} Tasks
 */
const createSubmitApplicationTasks = (otherGroups: TaskListData, referenceNumber: number): Array<TaskListDataTask> => {
  const initialChecksGroup = getGroupById(otherGroups, GROUP_IDS.INITIAL_CHECKS);
  const prepareApplicationGroup = getGroupById(otherGroups, GROUP_IDS.PREPARE_APPLICATION);

  const DECLARATIONS = {
    href: '#',
    title: SUBMIT_APPLICATION.TASKS.DECLARATIONS,
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
    href: `${INSURANCE_ROOT}/${referenceNumber}${ELIGIBILITY}`,
    title: SUBMIT_APPLICATION.TASKS.CHECK_ANSWERS_AND_SUBMIT,
    id: TASK_IDS.SUBMIT_APPLICATION.CHECK_ANSWERS_AND_SUBMIT,
    fields: [],
    // dependencies: [...DECLARATIONS.fields, ...DECLARATIONS.dependencies],
    dependencies: [],
  };

  const tasks = [DECLARATIONS, CHECK_ANSWERS_AND_SUBMIT] as Array<TaskListDataTask>;

  return tasks;
};

export default createSubmitApplicationTasks;
