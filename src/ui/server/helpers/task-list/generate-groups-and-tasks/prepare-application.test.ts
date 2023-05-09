import createPrepareApplicationTasks from './prepare-application';
import { TaskListData } from '../../../../types';
import createInitialChecksTasks from './initial-checks';
import { GROUP_IDS, TASK_IDS, ROUTES, FIELD_VALUES } from '../../../constants';
import { TASKS } from '../../../content-strings';
import { getAllTasksFieldsInAGroup } from '../task-helpers';
import policyAndExportsRequiredFields from '../../required-fields/policy-and-exports';
import businessRequiredFields from '../../required-fields/exporter-business';
import yourBuyerRequiredFields from '../../required-fields/your-buyer';
import { mockApplication } from '../../../test-mocks';

const { INSURANCE } = ROUTES;
const { INSURANCE_ROOT, POLICY_AND_EXPORTS, EXPORTER_BUSINESS: EXPORTER_BUSINESS_ROUTES, YOUR_BUYER: YOUR_BUYER_ROUTES } = INSURANCE;

const { PREPARE_APPLICATION } = TASKS.LIST;

describe('server/helpers/task-list/prepare-application', () => {
  const { referenceNumber, policyAndExport } = mockApplication;
  const { policyType } = policyAndExport;

  describe('createPrepareApplicationTasks', () => {
    const initialChecksTasks = createInitialChecksTasks();
    const isUsingBroker = FIELD_VALUES.YES;

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

      const POLICY_TYPE_AND_EXPORTS = {
        href: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${POLICY_AND_EXPORTS.TYPE_OF_POLICY}`,
        title: TASKS.LIST.PREPARE_APPLICATION.TASKS.POLICY_TYPE_AND_EXPORTS,
        id: TASK_IDS.PREPARE_APPLICATION.POLICY_TYPE_AND_EXPORTS,
        fields: policyAndExportsRequiredFields(policyType),
        dependencies: expectedDependencies,
      };

      const EXPORTER_BUSINESS = {
        href: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${EXPORTER_BUSINESS_ROUTES.COMPANY_DETAILS}`,
        title: PREPARE_APPLICATION.TASKS.EXPORTER_BUSINESS,
        id: TASK_IDS.PREPARE_APPLICATION.EXPORTER_BUSINESS,
        fields: businessRequiredFields(isUsingBroker),
        dependencies: [...POLICY_TYPE_AND_EXPORTS.dependencies],
      };

      const YOUR_BUYER = {
        href: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${YOUR_BUYER_ROUTES.COMPANY_OR_ORGANISATION}`,
        title: PREPARE_APPLICATION.TASKS.BUYER,
        id: TASK_IDS.PREPARE_APPLICATION.BUYER,
        fields: yourBuyerRequiredFields(),
        dependencies: [...POLICY_TYPE_AND_EXPORTS.dependencies],
      };

      const expected = [POLICY_TYPE_AND_EXPORTS, EXPORTER_BUSINESS, YOUR_BUYER];

      expect(result).toEqual(expected);
    });
  });
});
