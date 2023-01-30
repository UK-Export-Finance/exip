import { TaskListDataTask } from '../../../../types';
import { TASKS } from '../../../content-strings';
import { FIELD_IDS, TASK_IDS } from '../../../constants';

const { INITIAL_CHECKS } = TASKS.LIST;

const { ALREADY_HAVE_ACCOUNT } = FIELD_IDS.INSURANCE.ELIGIBILITY;

/**
 * createInitialChecksTasks
 * @returns {Array} Tasks
 */
const createInitialChecksTasks = (): Array<TaskListDataTask> => [
  {
    href: '#',
    title: INITIAL_CHECKS.TASKS.ELIGIBILITY,
    id: TASK_IDS.INITIAL_CHECKS.ELIGIBILITY,
    fields: Object.values(FIELD_IDS.INSURANCE.ELIGIBILITY).filter((fieldId) => fieldId !== ALREADY_HAVE_ACCOUNT),
    dependencies: [],
  } as TaskListDataTask,
];

export default createInitialChecksTasks;
