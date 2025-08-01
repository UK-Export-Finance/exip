import { GROUP_IDS, TASK_IDS } from '../../../constants';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { TASKS } from '../../../content-strings';
import { getGroupById, getAllTasksFieldsInAGroup } from '../task-helpers';
import businessRequiredFields from '../../required-fields/business';
import yourBuyerRequiredFields from '../../required-fields/your-buyer';
import policyRequiredFields from '../../required-fields/policy';
import exportContractRequiredFields from '../../required-fields/export-contract';
import { CreatePrepareApplicationTasksParams, TaskListDataTask } from '../../../../types';

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
 * @param {number} referenceNumber: Application reference number
 * @param {Array} otherGroups: Task list groups
 * @param {string} policyType: Application "Policy type"
 * @param {boolean} isUsingBroker: "Is using broker" flag
 * @param {boolean} brokerIsBasedInUk: "Broker is based in the UK" flag
 * @param {string} brokerFullAddress: Broker "full address" data
 * @param {boolean} isAppointingLossPayee: "Is using loss payee" flag
 * @param {boolean} lossPayeeIsLocatedInUk: "Loss payee is located in the UK" flag
 * @param {boolean} lossPayeeIsLocatedInternationally: "Loss payee is located internationally" flag
 * @param {boolean} attemptedPrivateMarketCover: "Attempted cover via the private market" flag
 * @param {boolean} isUsingAgent: "Is using an agent to help win the export contract" flag
 * @param {boolean} agentIsCharging: "Is the agent charging for their support in the export contract?" flag
 * @param {string} agentChargeMethod: Agent charge method
 * @param {string} awardMethodId: Export contract award method ID
 * @returns {Array} Prepare application tasks
 */
const createPrepareApplicationTasks = ({
  referenceNumber,
  otherGroups,
  policyType,
  finalDestinationKnown,
  jointlyInsuredParty,
  isUsingBroker,
  brokerIsBasedInUk,
  brokerFullAddress,
  isAppointingLossPayee,
  lossPayeeIsLocatedInUk,
  lossPayeeIsLocatedInternationally,
  hasDifferentTradingName,
  connectionWithBuyer,
  tradedWithBuyer,
  outstandingPayments,
  hasPreviousCreditInsuranceWithBuyer,
  totalContractValueOverThreshold,
  attemptedPrivateMarketCover,
  isUsingAgent,
  agentIsCharging,
  agentChargeMethod,
  awardMethodId,
}: CreatePrepareApplicationTasksParams): Array<TaskListDataTask> => {
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
    fields: policyRequiredFields({
      policyType,
      jointlyInsuredParty,
      isUsingBroker,
      brokerIsBasedInUk,
      brokerFullAddress,
      isAppointingLossPayee,
      lossPayeeIsLocatedInUk,
      lossPayeeIsLocatedInternationally,
    }),
    dependencies,
  };

  const YOUR_EXPORT_CONTRACT = {
    href: `${INSURANCE_ROOT}/${referenceNumber}${EXPORT_CONTRACT_ROOT}`,
    title: TASKS.LIST.PREPARE_APPLICATION.TASKS.EXPORT_CONTRACT,
    id: TASK_IDS.PREPARE_APPLICATION.EXPORT_CONTRACT,
    fields: exportContractRequiredFields({
      finalDestinationKnown,
      attemptedPrivateMarketCover,
      totalContractValueOverThreshold,
      isUsingAgent,
      agentIsCharging,
      agentChargeMethod,
      awardMethodId,
    }),
    dependencies,
  };

  const tasks = [EXPORTER_BUSINESS, YOUR_BUYER, POLICY, YOUR_EXPORT_CONTRACT] as Array<TaskListDataTask>;

  return tasks;
};

export default createPrepareApplicationTasks;
