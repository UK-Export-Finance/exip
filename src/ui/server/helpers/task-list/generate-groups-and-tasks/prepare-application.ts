import { TaskListDataTask, TaskListData } from '../../../../types';
import { GROUP_IDS, TASK_IDS, ROUTES } from '../../../constants';
import { TASKS } from '../../../content-strings';
import { getGroupById, getAllTasksFieldsInAGroup } from '../task-helpers';
import policyAndExportsRequiredFields from '../../required-fields/policy-and-exports';
import businessRequiredFields from '../../required-fields/business';
import yourBuyerRequiredFields from '../../required-fields/your-buyer';

const { INSURANCE } = ROUTES;
const { INSURANCE_ROOT, POLICY_AND_EXPORTS, EXPORTER_BUSINESS: EXPORTER_BUSINESS_ROUTES, YOUR_BUYER: YOUR_BUYER_ROUTES } = INSURANCE;

const { PREPARE_APPLICATION } = TASKS.LIST;

/**
 * createPrepareApplicationTasks
 * @param {Number} Application reference number
 * @param {Array} Task list groups
 * @param {String} Application "Policy type"
 * @param {String} Application "Is using broker" flag
 * @returns {Array} Prepare application tasks
 */
const createPrepareApplicationTasks = (
  referenceNumber: number,
  otherGroups: TaskListData,
  policyType?: string,
  isUsingBroker?: string,
): Array<TaskListDataTask> => {
  const initialChecksGroup = getGroupById(otherGroups, GROUP_IDS.INITIAL_CHECKS);

  const allInitialChecksFields = getAllTasksFieldsInAGroup(initialChecksGroup);

  const POLICY_TYPE_AND_EXPORTS = {
    href: `${INSURANCE_ROOT}/${referenceNumber}${POLICY_AND_EXPORTS.TYPE_OF_POLICY}`,
    title: TASKS.LIST.PREPARE_APPLICATION.TASKS.POLICY_TYPE_AND_EXPORTS,
    id: TASK_IDS.PREPARE_APPLICATION.POLICY_TYPE_AND_EXPORTS,
    fields: policyAndExportsRequiredFields(policyType),
    dependencies: allInitialChecksFields,
  };

  const EXPORTER_BUSINESS = {
    href: `${INSURANCE_ROOT}/${referenceNumber}${EXPORTER_BUSINESS_ROUTES.COMPANIES_HOUSE_NUMBER_ROOT}`,
    title: PREPARE_APPLICATION.TASKS.EXPORTER_BUSINESS,
    id: TASK_IDS.PREPARE_APPLICATION.EXPORTER_BUSINESS,
    fields: businessRequiredFields(isUsingBroker),
    dependencies: [...POLICY_TYPE_AND_EXPORTS.dependencies],
  };

  const YOUR_BUYER = {
    href: `${INSURANCE_ROOT}/${referenceNumber}${YOUR_BUYER_ROUTES.COMPANY_OR_ORGANISATION}`,
    title: PREPARE_APPLICATION.TASKS.BUYER,
    id: TASK_IDS.PREPARE_APPLICATION.BUYER,
    fields: yourBuyerRequiredFields(),
    dependencies: [...POLICY_TYPE_AND_EXPORTS.dependencies],
  };

  const tasks = [POLICY_TYPE_AND_EXPORTS, EXPORTER_BUSINESS, YOUR_BUYER] as Array<TaskListDataTask>;

  return tasks;
};

export default createPrepareApplicationTasks;
