import prepeApplicationTasks from './prepare-application';
import { TaskListData, TaskListDataGroupTasksInitialChecks } from '../../../../types';
import createInitialChecksTasks from './initial-checks';
import { ROUTES } from '../../../constants';
import { TASKS } from '../../../content-strings';

describe('server/helpers/task-list/prepare-application', () => {
  it('should return EXIP `prepare application` tasks', () => {
    const initialChecks = createInitialChecksTasks() as TaskListDataGroupTasksInitialChecks;

    // @ts-ignore
    const previousGroups: TaskListData = {
      INITIAL_CHECKS: {
        title: TASKS.LIST.INITIAL_CHECKS.TITLE,
        tasks: initialChecks,
      },
    };

    const result = prepeApplicationTasks(previousGroups);

    const expected = {
      POLICY_TYPE: {
        href: ROUTES.QUOTE.POLICY_TYPE,
        title: TASKS.LIST.PREPARE_APPLICATION.TASKS.POLICY_TYPE,
        id: 'mock',
        fields: [],
        dependencies: [],
      },
      EXPORTS_TO_INSURE: {
        href: '/mock',
        title: TASKS.LIST.PREPARE_APPLICATION.TASKS.EXPORTS_TO_INSURE,
        id: 'mock',
        fields: [],
        dependencies: [],
      },

      ABOUT_BUSINESS: {
        href: '/mock',
        title: TASKS.LIST.PREPARE_APPLICATION.TASKS.ABOUT_BUSINESS,
        id: 'mock',
        fields: [],
        dependencies: [],
      },

      BUYER: {
        href: '/mock',
        title: TASKS.LIST.PREPARE_APPLICATION.TASKS.BUYER,
        id: 'mock',
        fields: [],
        dependencies: [],
      },
    };

    expect(result).toEqual(expected);
  });
});
