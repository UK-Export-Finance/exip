import { TaskListDataTask, TaskListData } from '../../../../types';
import { GROUP_IDS, TASK_IDS } from '../../../constants';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { TASKS } from '../../../content-strings';
import { getGroupById, getAllTasksFieldsInAGroup } from '../task-helpers';
import businessRequiredFields from '../../required-fields/business';
import yourBuyerRequiredFields from '../../required-fields/your-buyer';
import policyRequiredFields from '../../required-fields/policy';
import exportContractRequiredFields from '../../required-fields/export-contract';

const {
  INSURANCE_ROOT,
  POLICY: { ROOT: POLICY_ROOT },
  EXPORTER_BUSINESS: { ROOT: EXPORTER_BUSINESS_ROOT },
  YOUR_BUYER: { ROOT: YOUR_BUYER_ROOT },
  EXPORT_CONTRACT: { ROOT: EXPORT_CONTRACT_ROOT },
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
  finalDestinationKnown?: boolean,
  jointlyInsuredParty?: boolean,
  isUsingBroker?: boolean,
  hasDifferentTradingName?: boolean,
  connectionWithBuyer?: boolean,
  tradedWithBuyer?: boolean,
  outstandingPayments?: boolean,
  hasPreviousCreditInsuranceWithBuyer?: boolean,
  totalContractValueOverThreshold?: boolean,
): Array<TaskListDataTask> => {
  const initialChecksGroup = getGroupById(otherGroups, GROUP_IDS.INITIAL_CHECKS);

  const allInitialChecksFields = getAllTasksFieldsInAGroup(initialChecksGroup);

  const dependencies = [...allInitialChecksFields];

  const EXPORTER_BUSINESS = {
    href: `${INSURANCE_ROOT}/${referenceNumber}${EXPORTER_BUSINESS_ROOT}`,
    title: PREPARE_APPLICATION.TASKS.EXPORTER_BUSINESS,
    id: TASK_IDS.PREPARE_APPLICATION.EXPORTER_BUSINESS,
    fields: businessRequiredFields(hasDifferentTradingName),
    dependencies,
  };

  const YOUR_BUYER = {
    href: `${INSURANCE_ROOT}/${referenceNumber}${YOUR_BUYER_ROOT}`,
    title: PREPARE_APPLICATION.TASKS.BUYER,
    id: TASK_IDS.PREPARE_APPLICATION.BUYER,
    fields: yourBuyerRequiredFields({
      connectionWithBuyer,
      tradedWithBuyer,
      outstandingPayments,
      hasPreviousCreditInsuranceWithBuyer,
      totalContractValueOverThreshold,
    }),
    dependencies,
  };

  const POLICY = {
    href: `${INSURANCE_ROOT}/${referenceNumber}${POLICY_ROOT}`,
    title: TASKS.LIST.PREPARE_APPLICATION.TASKS.POLICY,
    id: TASK_IDS.PREPARE_APPLICATION.POLICY,
    fields: policyRequiredFields({ policyType, jointlyInsuredParty, isUsingBroker }),
    dependencies,
  };

  const YOUR_EXPORT_CONTRACT = {
    href: `${INSURANCE_ROOT}/${referenceNumber}${EXPORT_CONTRACT_ROOT}`,
    title: TASKS.LIST.PREPARE_APPLICATION.TASKS.EXPORT_CONTRACT,
    id: TASK_IDS.PREPARE_APPLICATION.EXPORT_CONTRACT,
    fields: exportContractRequiredFields({ finalDestinationKnown }),
    dependencies,
  };

  const tasks = [EXPORTER_BUSINESS, YOUR_BUYER, POLICY, YOUR_EXPORT_CONTRACT] as Array<TaskListDataTask>;

  return tasks;
};

export default createPrepareApplicationTasks;
