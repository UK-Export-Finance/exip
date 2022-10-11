import { TaskListDataTask } from '../../../../types';
import { TASKS } from '../../../content-strings';
import { TASK_IDS } from '../../../constants';

// NOTE: task list structure is temporary until design is final.
// This is just an example.

/**
 * createInitialChecksTasks
 * @returns {Array} Tasks
 */
const createInitialChecksTasks = (): Array<TaskListDataTask> => [
  {
    href: '#',
    title: TASKS.LIST.INITIAL_CHECKS.TASKS.ELIGIBILITY,
    id: TASK_IDS.INITIAL_CHECKS.ELIGIBILITY,
    fields: ['a'],
    dependencies: [],
  } as TaskListDataTask,
  {
    href: '#',
    title: TASKS.LIST.INITIAL_CHECKS.TASKS.CONTACT_DETAILS,
    id: TASK_IDS.INITIAL_CHECKS.CONTACT_DETAILS,
    fields: ['b', 'c'],
    dependencies: [],
  } as TaskListDataTask,
];

export default createInitialChecksTasks;
