import generateGroupsAndTasks from '.';
import initialChecksTasks from './initial-checks';
import prepareApplicationTasks from './prepare-application';
import submitApplicationTasks from './submit-application';
import { TASKS } from '../../../content-strings';
import { GROUP_IDS } from '../../../constants';
import { mockApplication } from '../../../test-mocks';

const { INITIAL_CHECKS, PREPARE_APPLICATION, SUBMIT_APPLICATION } = TASKS.LIST;

describe('server/helpers/task-list/generate-groups-and-tasks', () => {
  const {
    broker: { isUsingBroker, isBasedInUk: brokerIsBasedInUk, fullAddress: brokerFullAddress },
    buyer: {
      relationship: { exporterIsConnectedWithBuyer, exporterHasPreviousCreditInsuranceWithBuyer },
      buyerTradingHistory: { exporterHasTradedWithBuyer, outstandingPayments },
    },
    company: { hasDifferentTradingName },
    declaration,
    exportContract: {
      finalDestinationKnown,
      privateMarket: { attempted: attemptedPrivateMarketCover },
      agent: {
        isUsingAgent,
        service: {
          agentIsCharging,
          charge: { method: agentChargeMethod },
        },
      },
      awardMethod: { id: awardMethodId },
    },
    nominatedLossPayee: {
      isAppointed: isAppointingLossPayee,
      isLocatedInUk: lossPayeeIsLocatedInUk,
      isLocatedInternationally: lossPayeeIsLocatedInInternationally,
    },
    policy: { policyType, jointlyInsuredParty },
    referenceNumber,
    totalContractValueOverThreshold,
  } = mockApplication;

  it('should return EXIP groups and tasks', () => {
    const result = generateGroupsAndTasks(
      referenceNumber,
      declaration,
      policyType,
      finalDestinationKnown,
      jointlyInsuredParty.requested,
      isUsingBroker,
      brokerIsBasedInUk,
      brokerFullAddress,
      isAppointingLossPayee,
      lossPayeeIsLocatedInUk,
      lossPayeeIsLocatedInInternationally,
      hasDifferentTradingName,
      exporterIsConnectedWithBuyer,
      exporterHasTradedWithBuyer,
      outstandingPayments,
      exporterHasPreviousCreditInsuranceWithBuyer,
      totalContractValueOverThreshold,
      attemptedPrivateMarketCover,
      isUsingAgent,
      agentIsCharging,
      agentChargeMethod,
      awardMethodId,
    );

    const initialChecks = {
      title: INITIAL_CHECKS.HEADING,
      id: GROUP_IDS.INITIAL_CHECKS,
      tasks: initialChecksTasks(),
    };

    const prepareApplication = {
      title: PREPARE_APPLICATION.HEADING,
      hint: PREPARE_APPLICATION.HINT,
      id: GROUP_IDS.PREPARE_APPLICATION,
      tasks: prepareApplicationTasks({
        referenceNumber,
        otherGroups: [initialChecks],
        policyType,
        finalDestinationKnown,
        jointlyInsuredParty: jointlyInsuredParty.requested,
        isUsingBroker,
        brokerIsBasedInUk,
        brokerFullAddress,
        isAppointingLossPayee,
        lossPayeeIsLocatedInUk,
        hasDifferentTradingName,
        connectionWithBuyer: exporterIsConnectedWithBuyer,
        tradedWithBuyer: exporterHasTradedWithBuyer,
        outstandingPayments,
        hasPreviousCreditInsuranceWithBuyer: exporterHasPreviousCreditInsuranceWithBuyer,
        totalContractValueOverThreshold,
        attemptedPrivateMarketCover,
        isUsingAgent,
        agentIsCharging,
        agentChargeMethod,
        awardMethodId,
      }),
    };

    const submitApplication = {
      title: SUBMIT_APPLICATION.HEADING,
      id: GROUP_IDS.SUBMIT_APPLICATION,
      tasks: submitApplicationTasks(referenceNumber, [initialChecks, prepareApplication], declaration),
    };

    const expected = [initialChecks, prepareApplication, submitApplication];

    expect(result).toEqual(expected);
  });
});
