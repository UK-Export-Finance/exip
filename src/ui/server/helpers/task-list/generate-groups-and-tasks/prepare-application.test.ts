import createPrepareApplicationTasks from './prepare-application';
import { TaskListData } from '../../../../types';
import createInitialChecksTasks from './initial-checks';
import { GROUP_IDS, TASK_IDS } from '../../../constants';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { TASKS } from '../../../content-strings';
import { getAllTasksFieldsInAGroup } from '../task-helpers';
import policyRequiredFields from '../../required-fields/policy';
import businessRequiredFields from '../../required-fields/business';
import yourBuyerRequiredFields from '../../required-fields/your-buyer';
import { mockApplication } from '../../../test-mocks';

const {
  INSURANCE_ROOT,
  POLICY: { ROOT: POLICY_ROOT },
  EXPORTER_BUSINESS: { ROOT: EXPORTER_BUSINESS_ROOT },
  YOUR_BUYER: { COMPANY_OR_ORGANISATION },
  EXPORT_CONTRACT: { ROOT: EXPORT_CONTRACT_ROOT },
} = INSURANCE_ROUTES;

const { PREPARE_APPLICATION } = TASKS.LIST;

describe('server/helpers/task-list/prepare-application', () => {
  const { referenceNumber, broker, company, policy, exportContract } = mockApplication;
  const { isUsingBroker } = broker;
  const { hasDifferentTradingName } = company;
  const { policyType } = policy;
  const { finalDestinationKnown } = exportContract;

  describe('createPrepareApplicationTasks', () => {
    const initialChecksTasks = createInitialChecksTasks();

    const previousGroups = [
      {
        title: TASKS.LIST.INITIAL_CHECKS.HEADING,
        id: GROUP_IDS.INITIAL_CHECKS,
        tasks: initialChecksTasks,
      },
    ] as TaskListData;

    it('should return EXIP `prepare application` tasks', () => {
      const result = createPrepareApplicationTasks(referenceNumber, previousGroups, policyType, finalDestinationKnown, isUsingBroker, hasDifferentTradingName);

      const expectedDependencies = getAllTasksFieldsInAGroup(previousGroups[0]);

      const EXPORTER_BUSINESS = {
        href: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${EXPORTER_BUSINESS_ROOT}`,
        title: PREPARE_APPLICATION.TASKS.EXPORTER_BUSINESS,
        id: TASK_IDS.PREPARE_APPLICATION.EXPORTER_BUSINESS,
        fields: businessRequiredFields(hasDifferentTradingName),
        dependencies: expectedDependencies,
      };

      const YOUR_BUYER = {
        href: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${COMPANY_OR_ORGANISATION}`,
        title: PREPARE_APPLICATION.TASKS.BUYER,
        id: TASK_IDS.PREPARE_APPLICATION.BUYER,
        fields: yourBuyerRequiredFields(),
        dependencies: expectedDependencies,
      };

      const POLICY = {
        href: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${POLICY_ROOT}`,
        title: TASKS.LIST.PREPARE_APPLICATION.TASKS.POLICY,
        id: TASK_IDS.PREPARE_APPLICATION.POLICY,
        fields: policyRequiredFields({ policyType, finalDestinationKnown, isUsingBroker }),
        dependencies: expectedDependencies,
      };

      const YOUR_EXPORT_CONTRACT = {
        href: `${INSURANCE_ROOT}/${referenceNumber}${EXPORT_CONTRACT_ROOT}`,
        title: TASKS.LIST.PREPARE_APPLICATION.TASKS.EXPORT_CONTRACT,
        id: TASK_IDS.PREPARE_APPLICATION.EXPORT_CONTRACT,
        fields: [],
        dependencies: expectedDependencies,
      };

      const expected = [EXPORTER_BUSINESS, YOUR_BUYER, POLICY, YOUR_EXPORT_CONTRACT];

      expect(result).toEqual(expected);
    });
  });
});
