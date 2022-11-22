import createPrepareApplicationTasks from './prepare-application';
import { TaskListData } from '../../../../types';
import { getTaskById } from '../task-helpers';
import createInitialChecksTasks from './initial-checks';
import { GROUP_IDS, TASK_IDS } from '../../../constants';
import { TASKS } from '../../../content-strings';

describe('server/helpers/task-list/prepare-application', () => {
  it('should return EXIP `prepare application` tasks', () => {
    const initialChecks = createInitialChecksTasks();

    const previousGroups = [
      {
        title: TASKS.LIST.INITIAL_CHECKS.HEADING,
        id: GROUP_IDS.INITIAL_CHECKS,
        tasks: initialChecks,
      },
    ] as TaskListData;

    const result = createPrepareApplicationTasks(previousGroups);

    const POLICY_TYPE_AND_EXPORTS = {
      href: '#',
      title: TASKS.LIST.PREPARE_APPLICATION.TASKS.POLICY_TYPE_AND_EXPORTS,
      id: TASK_IDS.PREPARE_APPLICATION.POLICY_TYPE_AND_EXPORTS,
      fields: [],
      dependencies: [...getTaskById(previousGroups[0].tasks, TASK_IDS.INITIAL_CHECKS.ELIGIBILITY).fields],
    };

    const EXPORTER_BUSINESS = {
      href: '#',
      title: TASKS.LIST.PREPARE_APPLICATION.TASKS.EXPORTER_BUSINESS,
      id: TASK_IDS.PREPARE_APPLICATION.EXPORTER_BUSINESS,
      fields: [],
      dependencies: [...POLICY_TYPE_AND_EXPORTS.fields, ...POLICY_TYPE_AND_EXPORTS.dependencies],
    };

    const expected = [
      POLICY_TYPE_AND_EXPORTS,
      EXPORTER_BUSINESS,
      {
        href: '#',
        title: TASKS.LIST.PREPARE_APPLICATION.TASKS.BUYER,
        id: TASK_IDS.PREPARE_APPLICATION.BUYER,
        fields: ['temp'],
        dependencies: [...EXPORTER_BUSINESS.dependencies, ...EXPORTER_BUSINESS.fields],
      },
    ];

    expect(result).toEqual(expected);
  });
});
