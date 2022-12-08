import createSubmitApplicationTasks from './submit-application';
import { getTaskById } from '../task-helpers';
import generateGroupsAndTasks from '.';
import { TASK_IDS } from '../../../constants';
import { TASKS } from '../../../content-strings';
import { mockApplication } from '../../../test-mocks';

const { SUBMIT_APPLICATION } = TASKS.LIST;

describe('server/helpers/task-list/submit-application', () => {
  it('should return EXIP `submit application` tasks', () => {
    const groupsAndTasks = generateGroupsAndTasks(mockApplication.referenceNumber);

    const initialChecksGroup = groupsAndTasks[0];
    const prepareApplicationGroup = groupsAndTasks[1];

    const previousGroups = [initialChecksGroup, prepareApplicationGroup];

    const result = createSubmitApplicationTasks(previousGroups);

    const DECLARATIONS = {
      href: '#',
      title: SUBMIT_APPLICATION.TASKS.DECLARATIONS,
      id: TASK_IDS.SUBMIT_APPLICATION.DECLARATIONS,
      fields: ['temp'],
      dependencies: [
        ...getTaskById(initialChecksGroup.tasks, TASK_IDS.INITIAL_CHECKS.ELIGIBILITY).fields,
        ...getTaskById(prepareApplicationGroup.tasks, TASK_IDS.PREPARE_APPLICATION.POLICY_TYPE_AND_EXPORTS).fields,
        ...getTaskById(prepareApplicationGroup.tasks, TASK_IDS.PREPARE_APPLICATION.EXPORTER_BUSINESS).fields,
        ...getTaskById(prepareApplicationGroup.tasks, TASK_IDS.PREPARE_APPLICATION.BUYER).fields,
      ],
    };

    const CHECK_ANSWERS_AND_SUBMIT = {
      href: '#',
      title: SUBMIT_APPLICATION.TASKS.CHECK_ANSWERS_AND_SUBMIT,
      id: TASK_IDS.SUBMIT_APPLICATION.CHECK_ANSWERS_AND_SUBMIT,
      fields: [],
      dependencies: [...DECLARATIONS.fields, ...DECLARATIONS.dependencies],
    };

    const expected = [DECLARATIONS, CHECK_ANSWERS_AND_SUBMIT];

    expect(result).toEqual(expected);
  });
});
