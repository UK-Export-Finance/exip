import initialChecksTasks from './initial-checks';
import prepareApplicationTasks from './prepare-application';
import submitApplicationTasks from './submit-application';
import { TASKS } from '../../../content-strings';
import { GROUP_IDS } from '../../../constants';
import { TaskListData, ApplicationDeclaration } from '../../../../types';

const { INITIAL_CHECKS, PREPARE_APPLICATION, SUBMIT_APPLICATION } = TASKS.LIST;

/**
 * generateGroupsAndTasks
 * @param {Number} referenceNumber: Application reference number
 * @param {Boolean} declaration: Application declaration answers
 * @param {String} policyType: "Policy type"
 * @param {Boolean} finalDestinationKnown: "Final destination known" flag
 * @param {Boolean} jointlyInsuredParty: "Jointly insured party" flag
 * @param {Boolean} isUsingBroker: "Is using broker" flag
 * @param {Boolean} brokerIsBasedInUk: "Broker is based in the UK" flag
 * @param {String} brokerFullAddress: Broker "full address" data
 * @param {Boolean} isAppointingLossPayee: "Is using loss payee" flag
 * @param {Boolean} lossPayeeIsLocatedInUk: "Loss payee is located in the UK" flag
 * @param {Boolean} lossPayeeIsLocatedInternationally: "Loss payee is located internationally" flag
 * @param {Boolean} hasDifferentTradingName "Has different trading name" flag
 * @param {Boolean} connectionWithBuyer: "Exporter has a connection with the buyer" flag
 * @param {Boolean} tradedWithBuyer: "Exporter has a traded with the buyer" flag
 * @param {Boolean} outstandingPayments: "Buyer has outstanding payments" flag
 * @param {Boolean} hasPreviousCreditInsuranceWithBuyer: "Exporter has previous credit insurance with buyer" flag
 * @param {Boolean} totalContractValueOverThreshold: "Total contract value is over the threshold" flag
 * @param {Boolean} attemptedPrivateMarketCover: "Attempted cover via the private market" flag
 * @param {Boolean} isUsingAgent: "Is using an agent to help win the export contract" flag
 * @param {Boolean} agentIsCharging: "Is the agent charging for their support in the export contract?" flag
 * @param {String} agentChargeMethod: Agent charge method
 * @param {String} awardMethodId: Export contract award method ID
 * @returns {Array} Task list groups and tasks
 */
const generateGroupsAndTasks = (
  referenceNumber: number,
  declaration: ApplicationDeclaration,
  policyType?: string,
  finalDestinationKnown?: boolean,
  jointlyInsuredParty?: boolean,
  isUsingBroker?: boolean,
  brokerIsBasedInUk?: boolean,
  brokerFullAddress?: string,
  isAppointingLossPayee?: boolean,
  lossPayeeIsLocatedInUk?: boolean,
  lossPayeeIsLocatedInternationally?: boolean,
  hasDifferentTradingName?: boolean,
  connectionWithBuyer?: boolean,
  tradedWithBuyer?: boolean,
  outstandingPayments?: boolean,
  hasPreviousCreditInsuranceWithBuyer?: boolean,
  totalContractValueOverThreshold?: boolean,
  attemptedPrivateMarketCover?: boolean,
  isUsingAgent?: boolean,
  agentIsCharging?: boolean,
  agentChargeMethod?: string,
  awardMethodId?: string,
): TaskListData => {
  let groups = [
    {
      title: INITIAL_CHECKS.HEADING,
      id: GROUP_IDS.INITIAL_CHECKS,
      tasks: initialChecksTasks(),
    },
  ] as TaskListData;

  groups = [
    ...groups,
    {
      title: PREPARE_APPLICATION.HEADING,
      hint: PREPARE_APPLICATION.HINT,
      id: GROUP_IDS.PREPARE_APPLICATION,
      tasks: prepareApplicationTasks({
        referenceNumber,
        otherGroups: groups,
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
      }),
    },
  ] as TaskListData;

  groups = [
    ...groups,
    {
      title: SUBMIT_APPLICATION.HEADING,
      id: GROUP_IDS.SUBMIT_APPLICATION,
      tasks: submitApplicationTasks(referenceNumber, groups, declaration),
    },
  ] as TaskListData;

  return groups;
};

export default generateGroupsAndTasks;
