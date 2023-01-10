import createPrepareApplicationTasks from './prepare-application';
import { TaskListData } from '../../../../types';
import createInitialChecksTasks from './initial-checks';
import { FIELD_IDS, GROUP_IDS, TASK_IDS, ROUTES } from '../../../constants';
import { SHARED_CONTRACT_POLICY } from '../../../constants/field-ids/insurance/policy-and-exports';
import { TASKS } from '../../../content-strings';
import { getAllTasksFieldsInAGroup } from '../task-helpers';
import { mockApplication } from '../../../test-mocks';

const { INSURANCE } = ROUTES;
const { INSURANCE_ROOT, POLICY_AND_EXPORTS } = INSURANCE;

const { PREPARE_APPLICATION } = TASKS.LIST;

describe('server/helpers/task-list/prepare-application', () => {
  it('should return EXIP `prepare application` tasks', () => {
    const initialChecksTasks = createInitialChecksTasks();

    const previousGroups = [
      {
        title: TASKS.LIST.INITIAL_CHECKS.HEADING,
        id: GROUP_IDS.INITIAL_CHECKS,
        tasks: initialChecksTasks,
      },
    ] as TaskListData;

    const result = createPrepareApplicationTasks(mockApplication.referenceNumber, previousGroups);

    const expectedDependencies = getAllTasksFieldsInAGroup(previousGroups[0]);

    const POLICY_TYPE_AND_EXPORTS = {
      href: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${POLICY_AND_EXPORTS.TYPE_OF_POLICY}`,
      title: TASKS.LIST.PREPARE_APPLICATION.TASKS.POLICY_TYPE_AND_EXPORTS,
      id: TASK_IDS.PREPARE_APPLICATION.POLICY_TYPE_AND_EXPORTS,
      fields: Object.values({
        ...FIELD_IDS.INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY,
        ...SHARED_CONTRACT_POLICY,
        ...FIELD_IDS.INSURANCE.POLICY_AND_EXPORTS.CONTRACT_POLICY.SINGLE,
        ...FIELD_IDS.INSURANCE.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES,
      }),
      dependencies: expectedDependencies,
    };

    const EXPORTER_BUSINESS = {
      href: '#',
      title: PREPARE_APPLICATION.TASKS.EXPORTER_BUSINESS,
      id: TASK_IDS.PREPARE_APPLICATION.EXPORTER_BUSINESS,
      fields: [],
      dependencies: [...POLICY_TYPE_AND_EXPORTS.dependencies],
    };

    const expected = [
      POLICY_TYPE_AND_EXPORTS,
      EXPORTER_BUSINESS,
      {
        href: '#',
        title: PREPARE_APPLICATION.TASKS.BUYER,
        id: TASK_IDS.PREPARE_APPLICATION.BUYER,
        fields: ['temp'],
        dependencies: [...POLICY_TYPE_AND_EXPORTS.dependencies],
      },
    ];

    expect(result).toEqual(expected);
  });
});
