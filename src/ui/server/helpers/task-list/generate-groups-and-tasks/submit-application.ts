import { TaskListDataTask, TaskListData } from '../../../../types';
import { FIELD_IDS, GROUP_IDS, TASK_IDS } from '../../../constants';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { TASKS } from '../../../content-strings';
import { getGroupById, getAllTasksFieldsInAGroup } from '../task-helpers';

const { SUBMIT_APPLICATION } = TASKS.LIST;

const {
  INSURANCE_ROOT,
  DECLARATIONS: { CONFIDENTIALITY },
  CHECK_YOUR_ANSWERS: { ELIGIBILITY },
} = INSURANCE_ROUTES;

const {
  DECLARATIONS: { AGREE_CONFIDENTIALITY, AGREE_ANTI_BRIBERY },
} = FIELD_IDS.INSURANCE;

/**
 * createSubmitApplicationTasks
 * @param {Array} otherGroups Task list groups
 * @returns {Array} Tasks
 */
const createSubmitApplicationTasks = (referenceNumber: number, otherGroups: TaskListData): Array<TaskListDataTask> => {
  const initialChecksGroup = getGroupById(otherGroups, GROUP_IDS.INITIAL_CHECKS);
  const prepareApplicationGroup = getGroupById(otherGroups, GROUP_IDS.PREPARE_APPLICATION);

  const initialChecksFields = getAllTasksFieldsInAGroup(initialChecksGroup);
  const prepareApplicationFields = getAllTasksFieldsInAGroup(prepareApplicationGroup);

  const dependencies = [...initialChecksFields, ...prepareApplicationFields];

  const CHECK_ANSWERS = {
    href: `${INSURANCE_ROOT}/${referenceNumber}${ELIGIBILITY}`,
    title: SUBMIT_APPLICATION.TASKS.CHECK_ANSWERS,
    id: TASK_IDS.SUBMIT_APPLICATION.CHECK_ANSWERS,
    fields: [],
    dependencies,
  };

  const DECLARATIONS_AND_SUBMIT = {
    href: `${INSURANCE_ROOT}/${referenceNumber}${CONFIDENTIALITY}`,
    title: SUBMIT_APPLICATION.TASKS.DECLARATIONS_AND_SUBMIT,
    id: TASK_IDS.SUBMIT_APPLICATION.DECLARATIONS_AND_SUBMIT,
    fields: [AGREE_CONFIDENTIALITY, AGREE_ANTI_BRIBERY, 'temp'],
    dependencies,
  };

  const tasks = [CHECK_ANSWERS, DECLARATIONS_AND_SUBMIT] as Array<TaskListDataTask>;

  return tasks;
};

export default createSubmitApplicationTasks;
