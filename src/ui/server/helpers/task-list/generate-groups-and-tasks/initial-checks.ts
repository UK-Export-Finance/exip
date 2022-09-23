import { TaskListDataTask, TaskListDataGroupTasksInitialChecks } from '../../../../types';
import { TASKS } from '../../../content-strings';

const createInitialChecksTasks = (): TaskListDataGroupTasksInitialChecks => ({
  ELIGIBILITY: {
    href: 'mock',
    title: TASKS.LIST.INITIAL_CHECKS.TASKS.ELIGIBILITY,
    id: 'mock',
    fields: [
      // 'buyerCountry',
    ],
    dependencies: [],
  } as TaskListDataTask,
  CONTACT_DETAILS: {
    href: 'mock',
    title: TASKS.LIST.INITIAL_CHECKS.TASKS.CONTACT_DETAILS,
    id: 'mock',
    fields: [],
    dependencies: [],
  } as TaskListDataTask,
});

export default createInitialChecksTasks;
