import { TaskListDataTask, TaskListData } from '../../../../types';
import { GROUP_IDS, TASK_IDS } from '../../../constants';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { TASKS } from '../../../content-strings';
import { getGroupById, getAllTasksFieldsInAGroup } from '../task-helpers';

const { SUBMIT_APPLICATION } = TASKS.LIST;

const {
  INSURANCE_ROOT,
  DECLARATIONS: { CONFIDENTIALITY },
} = INSURANCE_ROUTES;

/**
 * createSubmitApplicationTasks
 * @param {Array} otherGroups Task list groups
 * @returns {Array} Tasks
 */
const createSubmitApplicationTasks = (referenceNumber: number, otherGroups: TaskListData): Array<TaskListDataTask> => {
  const initialChecksGroup = getGroupById(otherGroups, GROUP_IDS.INITIAL_CHECKS);
  const prepareApplicationGroup = getGroupById(otherGroups, GROUP_IDS.PREPARE_APPLICATION);

  const DECLARATIONS = {
    href: `${INSURANCE_ROOT}/${referenceNumber}${CONFIDENTIALITY}`,
    title: SUBMIT_APPLICATION.TASKS.DECLARATIONS,
    id: TASK_IDS.SUBMIT_APPLICATION.DECLARATIONS,
    fields: ['temp'],
    dependencies: [...getAllTasksFieldsInAGroup(initialChecksGroup), ...getAllTasksFieldsInAGroup(prepareApplicationGroup)],
  };

  const CHECK_ANSWERS_AND_SUBMIT = {
    href: '#',
    title: SUBMIT_APPLICATION.TASKS.CHECK_ANSWERS_AND_SUBMIT,
    id: TASK_IDS.SUBMIT_APPLICATION.CHECK_ANSWERS_AND_SUBMIT,
    fields: [],
    dependencies: [...DECLARATIONS.fields, ...DECLARATIONS.dependencies],
  };

  const tasks = [DECLARATIONS, CHECK_ANSWERS_AND_SUBMIT] as Array<TaskListDataTask>;

  return tasks;
};

export default createSubmitApplicationTasks;
