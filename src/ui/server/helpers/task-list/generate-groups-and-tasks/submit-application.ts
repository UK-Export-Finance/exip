import { TaskListDataTask, TaskListData } from '../../../../types';
import { FIELD_IDS, GROUP_IDS, TASK_IDS } from '../../../constants';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { TASKS } from '../../../content-strings';
import { getGroupById, getAllTasksFieldsInAGroup } from '../task-helpers';
import declarationsRequiredFields from '../../required-fields/declarations';

const { SUBMIT_APPLICATION } = TASKS.LIST;

const {
  INSURANCE_ROOT,
  DECLARATIONS: { CONFIDENTIALITY },
  CHECK_YOUR_ANSWERS: { ELIGIBILITY },
} = INSURANCE_ROUTES;

const {
  CHECK_YOUR_ANSWERS,
  CHECK_YOUR_ANSWERS: { POLICY, EXPORTER_BUSINESS, BUYER },
} = FIELD_IDS.INSURANCE;

/**
 * createSubmitApplicationTasks
 * @param { Number } Application reference number
 * @param {Array} Task list groups
 * @param { String } Application "Has anti-bribery code of conduct" flag
 * @returns {Array} Submit application tasks
 */
const createSubmitApplicationTasks = (
  referenceNumber: number,
  otherGroups: TaskListData,
  hasAntiBriberyCodeOfConduct?: boolean | null,
): Array<TaskListDataTask> => {
  const initialChecksGroup = getGroupById(otherGroups, GROUP_IDS.INITIAL_CHECKS);
  const prepareApplicationGroup = getGroupById(otherGroups, GROUP_IDS.PREPARE_APPLICATION);

  const initialChecksFields = getAllTasksFieldsInAGroup(initialChecksGroup);
  const prepareApplicationFields = getAllTasksFieldsInAGroup(prepareApplicationGroup);

  const dependencies = [...initialChecksFields, ...prepareApplicationFields];

  const CHECK_ANSWERS = {
    href: `${INSURANCE_ROOT}/${referenceNumber}${ELIGIBILITY}`,
    title: SUBMIT_APPLICATION.TASKS.CHECK_ANSWERS,
    id: TASK_IDS.SUBMIT_APPLICATION.CHECK_ANSWERS,
    fields: [CHECK_YOUR_ANSWERS.ELIGIBILITY, POLICY, EXPORTER_BUSINESS, BUYER],
    dependencies,
  };

  const DECLARATIONS_AND_SUBMIT = {
    href: `${INSURANCE_ROOT}/${referenceNumber}${CONFIDENTIALITY}`,
    title: SUBMIT_APPLICATION.TASKS.DECLARATIONS_AND_SUBMIT,
    id: TASK_IDS.SUBMIT_APPLICATION.DECLARATIONS_AND_SUBMIT,
    fields: declarationsRequiredFields(hasAntiBriberyCodeOfConduct),
    dependencies,
  };

  const tasks = [CHECK_ANSWERS, DECLARATIONS_AND_SUBMIT] as Array<TaskListDataTask>;

  return tasks;
};

export default createSubmitApplicationTasks;
