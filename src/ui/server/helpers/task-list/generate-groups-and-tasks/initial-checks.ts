import { TaskListDataTask } from '../../../../types';
import { TASKS } from '../../../content-strings';
import { TASK_IDS } from '../../../constants';
import requiredFields from '../../required-fields/eligibility';

const { INITIAL_CHECKS } = TASKS.LIST;

/**
 * createInitialChecksTasks
 * @returns {Array} Initial checks tasks
 */
const createInitialChecksTasks = (): Array<TaskListDataTask> => [
  {
    title: INITIAL_CHECKS.TASKS.ELIGIBILITY,
    id: TASK_IDS.INITIAL_CHECKS.ELIGIBILITY,
    fields: requiredFields(),
    dependencies: [],
  } as TaskListDataTask,
];

export default createInitialChecksTasks;
