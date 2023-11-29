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
  POLICY: { TYPE_OF_POLICY },
  EXPORTER_BUSINESS: { ROOT: EXPORTER_BUSINESS_ROOT },
  YOUR_BUYER: { COMPANY_OR_ORGANISATION },
} = INSURANCE_ROUTES;

const { PREPARE_APPLICATION } = TASKS.LIST;

describe('server/helpers/task-list/prepare-application', () => {
  const { referenceNumber, policy } = mockApplication;
  const { policyType } = policy;

  describe('createPrepareApplicationTasks', () => {
    const initialChecksTasks = createInitialChecksTasks();
    const isUsingBroker = true;
    const hasDifferentTradingName = false;

    const previousGroups = [
      {
        title: TASKS.LIST.INITIAL_CHECKS.HEADING,
        id: GROUP_IDS.INITIAL_CHECKS,
        tasks: initialChecksTasks,
      },
    ] as TaskListData;

    it('should return EXIP `prepare application` tasks', () => {
      const result = createPrepareApplicationTasks(referenceNumber, previousGroups, policyType, isUsingBroker);

      const expectedDependencies = getAllTasksFieldsInAGroup(previousGroups[0]);

      const EXPORTER_BUSINESS = {
        href: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${EXPORTER_BUSINESS_ROOT}`,
        title: PREPARE_APPLICATION.TASKS.EXPORTER_BUSINESS,
        id: TASK_IDS.PREPARE_APPLICATION.EXPORTER_BUSINESS,
        fields: businessRequiredFields(isUsingBroker, hasDifferentTradingName),
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
        href: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${TYPE_OF_POLICY}`,
        title: TASKS.LIST.PREPARE_APPLICATION.TASKS.POLICY,
        id: TASK_IDS.PREPARE_APPLICATION.POLICY,
        fields: policyRequiredFields(policyType),
        dependencies: expectedDependencies,
      };

      const YOUR_EXPORT_CONTRACT = {
        href: '#',
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
