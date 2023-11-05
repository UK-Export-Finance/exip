import { TaskListDataTask, TaskListData } from '../../../../types';
import { GROUP_IDS, TASK_IDS } from '../../../constants';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { TASKS } from '../../../content-strings';
import { getGroupById, getAllTasksFieldsInAGroup } from '../task-helpers';
import policyRequiredFields from '../../required-fields/policy';
import businessRequiredFields from '../../required-fields/business';
import yourBuyerRequiredFields from '../../required-fields/your-buyer';

const {
  INSURANCE_ROOT,
  POLICY: { TYPE_OF_POLICY },
  EXPORTER_BUSINESS: { COMPANIES_HOUSE_NUMBER_ROOT },
  YOUR_BUYER: { COMPANY_OR_ORGANISATION },
} = INSURANCE_ROUTES;

const { PREPARE_APPLICATION } = TASKS.LIST;

/**
 * createPrepareApplicationTasks
 * @param {Number} Application reference number
 * @param {Array} Task list groups
 * @param {String} Application "Policy type"
 * @param {Boolean} Application "Is using broker" flag
 * @returns {Array} Prepare application tasks
 */
const createPrepareApplicationTasks = (
  referenceNumber: number,
  otherGroups: TaskListData,
  policyType?: string,
  isUsingBroker?: boolean,
): Array<TaskListDataTask> => {
  const initialChecksGroup = getGroupById(otherGroups, GROUP_IDS.INITIAL_CHECKS);

  const allInitialChecksFields = getAllTasksFieldsInAGroup(initialChecksGroup);

  const POLICY = {
    href: `${INSURANCE_ROOT}/${referenceNumber}${TYPE_OF_POLICY}`,
    title: TASKS.LIST.PREPARE_APPLICATION.TASKS.POLICY,
    id: TASK_IDS.PREPARE_APPLICATION.POLICY,
    fields: policyRequiredFields(policyType),
    dependencies: allInitialChecksFields,
  };

  const EXPORTER_BUSINESS = {
    href: `${INSURANCE_ROOT}/${referenceNumber}${COMPANIES_HOUSE_NUMBER_ROOT}`,
    title: PREPARE_APPLICATION.TASKS.EXPORTER_BUSINESS,
    id: TASK_IDS.PREPARE_APPLICATION.EXPORTER_BUSINESS,
    fields: businessRequiredFields(isUsingBroker),
    dependencies: [...POLICY.dependencies],
  };

  const YOUR_BUYER = {
    href: `${INSURANCE_ROOT}/${referenceNumber}${COMPANY_OR_ORGANISATION}`,
    title: PREPARE_APPLICATION.TASKS.BUYER,
    id: TASK_IDS.PREPARE_APPLICATION.BUYER,
    fields: yourBuyerRequiredFields(),
    dependencies: [...POLICY.dependencies],
  };

  const tasks = [POLICY, EXPORTER_BUSINESS, YOUR_BUYER] as Array<TaskListDataTask>;

  return tasks;
};

export default createPrepareApplicationTasks;
