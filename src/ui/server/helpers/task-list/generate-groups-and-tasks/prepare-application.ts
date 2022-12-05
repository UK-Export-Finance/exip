import { TaskListDataTask, TaskListData } from '../../../../types';
import { FIELD_IDS, GROUP_IDS, TASK_IDS, ROUTES } from '../../../constants';
import { TASKS } from '../../../content-strings';
import { getGroupById, getAllTasksFieldsInAGroup } from '../task-helpers';

const { INSURANCE } = ROUTES;
const { INSURANCE_ROOT, POLICY_AND_EXPORTS } = INSURANCE;

/**
 * createPrepareApplicationTasks
 * @param {Array} otherGroups Task list groups
 * @returns {Array} Tasks
 */
const createPrepareApplicationTasks = (referenceNumber: number, otherGroups: TaskListData): Array<TaskListDataTask> => {
  const initialChecksGroup = getGroupById(otherGroups, GROUP_IDS.INITIAL_CHECKS);

  const allInitialChecksFields = getAllTasksFieldsInAGroup(initialChecksGroup);

  const POLICY_TYPE_AND_EXPORTS = {
    href: `${INSURANCE_ROOT}/${referenceNumber}${POLICY_AND_EXPORTS.TYPE_OF_POLICY}`,
    title: TASKS.LIST.PREPARE_APPLICATION.TASKS.POLICY_TYPE_AND_EXPORTS,
    id: TASK_IDS.PREPARE_APPLICATION.POLICY_TYPE_AND_EXPORTS,
    fields: Object.values(FIELD_IDS.INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY),
    dependencies: allInitialChecksFields,
  };

  const EXPORTER_BUSINESS = {
    href: '#',
    title: TASKS.LIST.PREPARE_APPLICATION.TASKS.EXPORTER_BUSINESS,
    id: TASK_IDS.PREPARE_APPLICATION.EXPORTER_BUSINESS,
    fields: [],
    dependencies: [...POLICY_TYPE_AND_EXPORTS.dependencies],
  };

  const tasks = [
    POLICY_TYPE_AND_EXPORTS,
    EXPORTER_BUSINESS,
    {
      href: '#',
      title: TASKS.LIST.PREPARE_APPLICATION.TASKS.BUYER,
      id: TASK_IDS.PREPARE_APPLICATION.BUYER,
      fields: ['temp'],
      dependencies: [...POLICY_TYPE_AND_EXPORTS.dependencies],
    },
  ] as Array<TaskListDataTask>;

  return tasks;
};

export default createPrepareApplicationTasks;
