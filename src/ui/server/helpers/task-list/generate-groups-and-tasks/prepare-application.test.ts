import prepareApplicationTasks from './prepare-application';
import { TaskListData, TaskListDataTask } from '../../../../types';
import { getTaskById } from '../task-helpers';
import createInitialChecksTasks from './initial-checks';
import { GROUP_IDS, ROUTES, TASK_IDS } from '../../../constants';
import { TASKS } from '../../../content-strings';

describe('server/helpers/task-list/prepare-application', () => {
  it('should return EXIP `prepare application` tasks', () => {
    const initialChecks = createInitialChecksTasks() as Array<TaskListDataTask>;

    const previousGroups = [
      {
        title: TASKS.LIST.INITIAL_CHECKS.TITLE,
        id: GROUP_IDS.INITIAL_CHECKS,
        tasks: initialChecks,
      },
    ] as TaskListData;

    const result = prepareApplicationTasks(previousGroups);

    const POLICY_TYPE = {
      href: ROUTES.QUOTE.POLICY_TYPE,
      title: TASKS.LIST.PREPARE_APPLICATION.TASKS.POLICY_TYPE,
      id: TASK_IDS.PREPARE_APPLICATION.POLICY_TYPE,
      fields: [],
      dependencies: [
        ...getTaskById(previousGroups[0].tasks, TASK_IDS.INITIAL_CHECKS.ELIGIBILITY).fields,
        ...getTaskById(previousGroups[0].tasks, TASK_IDS.INITIAL_CHECKS.CONTACT_DETAILS).fields,
      ],
    };

    const EXPORTS_TO_INSURE = {
      href: '#',
      title: TASKS.LIST.PREPARE_APPLICATION.TASKS.EXPORTS_TO_INSURE,
      id: TASK_IDS.PREPARE_APPLICATION.EXPORTS_TO_INSURE,
      fields: [],
      dependencies: [...POLICY_TYPE.fields, ...POLICY_TYPE.dependencies],
    };

    const expected = [
      POLICY_TYPE,
      EXPORTS_TO_INSURE,
      {
        href: '#',
        title: TASKS.LIST.PREPARE_APPLICATION.TASKS.ABOUT_BUSINESS,
        id: TASK_IDS.PREPARE_APPLICATION.ABOUT_BUSINESS,
        fields: [],
        dependencies: [...EXPORTS_TO_INSURE.dependencies, ...EXPORTS_TO_INSURE.fields],
      },
      {
        href: '#',
        title: TASKS.LIST.PREPARE_APPLICATION.TASKS.BUYER,
        id: TASK_IDS.PREPARE_APPLICATION.BUYER,
        fields: [],
        dependencies: [],
      },
    ];

    expect(result).toEqual(expected);
  });
});
