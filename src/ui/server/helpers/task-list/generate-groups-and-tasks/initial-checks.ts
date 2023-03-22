import { TaskListDataTask } from '../../../../types';
import { TASKS } from '../../../content-strings';
import { TASK_IDS } from '../../../constants';
import requiredFields from '../../section-fields/eligibility';

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

    // strip out the ACCOUNT_TO_APPLY_ONLINE field. This field is part of eligibility,
    // but we don't save this field (useless). Therefore we do not want to include this
    // in the list of required eligibility fields.
    fields: requiredFields(),
    dependencies: [],
  } as TaskListDataTask,
];

export default createInitialChecksTasks;
