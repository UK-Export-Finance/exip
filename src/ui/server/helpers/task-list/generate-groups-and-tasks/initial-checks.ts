import { TaskListDataTask } from '../../../../types';
import { TASKS } from '../../../content-strings';
import { FIELD_IDS, TASK_IDS } from '../../../constants';

const { INITIAL_CHECKS } = TASKS.LIST;

/**
 * createInitialChecksTasks
 * @returns {Array} Tasks
 */
const createInitialChecksTasks = (): Array<TaskListDataTask> => [
  {
    href: '#',
    title: INITIAL_CHECKS.TASKS.ELIGIBILITY,
    id: TASK_IDS.INITIAL_CHECKS.ELIGIBILITY,
    fields: Object.values(FIELD_IDS.INSURANCE.ELIGIBILITY),
    dependencies: [],
  } as TaskListDataTask,
];

export default createInitialChecksTasks;
