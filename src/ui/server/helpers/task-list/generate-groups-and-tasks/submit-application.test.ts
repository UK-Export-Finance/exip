import createSubmitApplicationTasks from './submit-application';
import { getAllTasksFieldsInAGroup } from '../task-helpers';
import generateGroupsAndTasks from '.';
import { TASK_IDS } from '../../../constants';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { TASKS } from '../../../content-strings';
import { mockApplication } from '../../../test-mocks';

const { SUBMIT_APPLICATION } = TASKS.LIST;

const {
  INSURANCE_ROOT,
  DECLARATIONS: { CONFIDENTIALITY },
} = INSURANCE_ROUTES;

describe('server/helpers/task-list/submit-application', () => {
  it('should return EXIP `submit application` tasks', () => {
    const { referenceNumber } = mockApplication;

    const groupsAndTasks = generateGroupsAndTasks(referenceNumber);

    const initialChecksGroup = groupsAndTasks[0];
    const prepareApplicationGroup = groupsAndTasks[1];

    const previousGroups = [initialChecksGroup, prepareApplicationGroup];

    const result = createSubmitApplicationTasks(referenceNumber, previousGroups);

    const DECLARATIONS = {
      href: `${INSURANCE_ROOT}/${referenceNumber}${CONFIDENTIALITY}`,
      title: SUBMIT_APPLICATION.TASKS.DECLARATIONS,
      id: TASK_IDS.SUBMIT_APPLICATION.DECLARATIONS,
      fields: ['temp'],
      dependencies: [...getAllTasksFieldsInAGroup(initialChecksGroup), ...getAllTasksFieldsInAGroup(prepareApplicationGroup)],
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
