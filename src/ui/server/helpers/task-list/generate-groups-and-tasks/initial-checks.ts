import { TaskListDataTask } from '../../../../types';
import { TASKS } from '../../../content-strings';
import { TASK_IDS } from '../../../constants';
import requiredFields from '../../required-fields/eligibility';

const { INITIAL_CHECKS } = TASKS.LIST;

/**
 * createInitialChecksTasks
 * @param {Boolean} migratedV1toV2: Application has been migrated from V1 to V2
 * @returns {Array} Initial checks tasks
 */
const createInitialChecksTasks = (migratedV1toV2?: boolean): Array<TaskListDataTask> => [
  {
    title: INITIAL_CHECKS.TASKS.ELIGIBILITY,
    id: TASK_IDS.INITIAL_CHECKS.ELIGIBILITY,
    fields: requiredFields(migratedV1toV2),
    dependencies: [],
  } as TaskListDataTask,
];

export default createInitialChecksTasks;
