import createPrepareApplicationTasks from './prepare-application';
import { TaskListData } from '../../../../types';
import createInitialChecksTasks from './initial-checks';
import { GROUP_IDS, TASK_IDS } from '../../../constants';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { TASKS } from '../../../content-strings';
import { getAllTasksFieldsInAGroup } from '../task-helpers';
import businessRequiredFields from '../../required-fields/business';
import yourBuyerRequiredFields from '../../required-fields/your-buyer';
import policyRequiredFields from '../../required-fields/policy';
import exportContractRequiredFields from '../../required-fields/export-contract';
import { mockApplication } from '../../../test-mocks';

const {
  INSURANCE_ROOT,
  POLICY: { ROOT: POLICY_ROOT },
  EXPORTER_BUSINESS: { ROOT: EXPORTER_BUSINESS_ROOT },
  YOUR_BUYER: { ROOT: YOUR_BUYER_ROOT },
  EXPORT_CONTRACT: { ROOT: EXPORT_CONTRACT_ROOT },
} = INSURANCE_ROUTES;

const { PREPARE_APPLICATION } = TASKS.LIST;

describe('server/helpers/task-list/prepare-application', () => {
  const {
    broker: { isUsingBroker },
    buyer: {
      relationship: { exporterIsConnectedWithBuyer, exporterHasPreviousCreditInsuranceWithBuyer },
      buyerTradingHistory: { exporterHasTradedWithBuyer, outstandingPayments },
    },
    company: { hasDifferentTradingName },
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
    },
    policy: { policyType, jointlyInsuredParty },
    referenceNumber,
    totalContractValueOverThreshold,
  } = mockApplication;

  describe('createPrepareApplicationTasks', () => {
    const initialChecksTasks = createInitialChecksTasks();

    const otherGroups = [
      {
        title: TASKS.LIST.INITIAL_CHECKS.HEADING,
        id: GROUP_IDS.INITIAL_CHECKS,
        tasks: initialChecksTasks,
      },
    ] as TaskListData;

    it('should return EXIP `prepare application` tasks', () => {
      const result = createPrepareApplicationTasks({
        referenceNumber,
        otherGroups,
        policyType,
        finalDestinationKnown,
        jointlyInsuredParty: jointlyInsuredParty.requested,
        isUsingBroker,
        hasDifferentTradingName,
        connectionWithBuyer: exporterIsConnectedWithBuyer,
        tradedWithBuyer: exporterHasTradedWithBuyer,
        outstandingPayments,
        hasPreviousCreditInsuranceWithBuyer: exporterHasPreviousCreditInsuranceWithBuyer,
        totalContractValueOverThreshold,
        attemptedPrivateMarketCover,
      });

      const expectedDependencies = getAllTasksFieldsInAGroup(otherGroups[0]);

      const EXPORTER_BUSINESS = {
        href: `${INSURANCE_ROOT}/${referenceNumber}${EXPORTER_BUSINESS_ROOT}`,
        title: PREPARE_APPLICATION.TASKS.EXPORTER_BUSINESS,
        id: TASK_IDS.PREPARE_APPLICATION.EXPORTER_BUSINESS,
        fields: businessRequiredFields(hasDifferentTradingName),
        dependencies: expectedDependencies,
      };

      const YOUR_BUYER = {
        href: `${INSURANCE_ROOT}/${referenceNumber}${YOUR_BUYER_ROOT}`,
        title: PREPARE_APPLICATION.TASKS.BUYER,
        id: TASK_IDS.PREPARE_APPLICATION.BUYER,
        fields: yourBuyerRequiredFields({
          connectionWithBuyer: exporterIsConnectedWithBuyer,
          tradedWithBuyer: exporterHasTradedWithBuyer,
          outstandingPayments,
          hasPreviousCreditInsuranceWithBuyer: exporterHasPreviousCreditInsuranceWithBuyer,
          totalContractValueOverThreshold,
        }),
        dependencies: expectedDependencies,
      };

      const POLICY = {
        href: `${INSURANCE_ROOT}/${referenceNumber}${POLICY_ROOT}`,
        title: TASKS.LIST.PREPARE_APPLICATION.TASKS.POLICY,
        id: TASK_IDS.PREPARE_APPLICATION.POLICY,
        fields: policyRequiredFields({
          policyType,
          jointlyInsuredParty: jointlyInsuredParty.requested,
          isUsingBroker,
        }),
        dependencies: expectedDependencies,
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
        }),
        dependencies: expectedDependencies,
      };

      const expected = [EXPORTER_BUSINESS, YOUR_BUYER, POLICY, YOUR_EXPORT_CONTRACT];

      expect(result).toEqual(expected);
    });
  });
});
