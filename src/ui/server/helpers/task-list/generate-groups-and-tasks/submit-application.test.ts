import createSubmitApplicationTasks from './submit-application';
import { getAllTasksFieldsInAGroup } from '../task-helpers';
import generateGroupsAndTasks from '.';
import { FIELD_IDS, TASK_IDS } from '../../../constants';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { TASKS } from '../../../content-strings';
import { mockApplication } from '../../../test-mocks';

const { SUBMIT_APPLICATION } = TASKS.LIST;

const {
  INSURANCE_ROOT,
  DECLARATIONS: { CONFIDENTIALITY },
  CHECK_YOUR_ANSWERS: { ELIGIBILITY },
} = INSURANCE_ROUTES;

const {
  DECLARATIONS: { AGREE_CONFIDENTIALITY, AGREE_ANTI_BRIBERY },
} = FIELD_IDS.INSURANCE;

describe('server/helpers/task-list/submit-application', () => {
  it('should return EXIP `submit application` tasks', () => {
    const { referenceNumber } = mockApplication;

    const groupsAndTasks = generateGroupsAndTasks(referenceNumber);

    const initialChecksGroup = groupsAndTasks[0];
    const prepareApplicationGroup = groupsAndTasks[1];

    const previousGroups = [initialChecksGroup, prepareApplicationGroup];

    const result = createSubmitApplicationTasks(referenceNumber, previousGroups);

    const initialChecksFields = getAllTasksFieldsInAGroup(initialChecksGroup);
    const prepareApplicationFields = getAllTasksFieldsInAGroup(prepareApplicationGroup);

    const expectedDependencies = [...initialChecksFields, ...prepareApplicationFields];

    const CHECK_ANSWERS = {
      href: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${ELIGIBILITY}`,
      title: SUBMIT_APPLICATION.TASKS.CHECK_ANSWERS,
      id: TASK_IDS.SUBMIT_APPLICATION.CHECK_ANSWERS,
      fields: [],
      dependencies: expectedDependencies,
    };

    const DECLARATIONS_AND_SUBMIT = {
      href: `${INSURANCE_ROOT}/${referenceNumber}${CONFIDENTIALITY}`,
      title: SUBMIT_APPLICATION.TASKS.DECLARATIONS_AND_SUBMIT,
      id: TASK_IDS.SUBMIT_APPLICATION.DECLARATIONS_AND_SUBMIT,
      fields: [AGREE_CONFIDENTIALITY, AGREE_ANTI_BRIBERY, 'temp'],
      dependencies: expectedDependencies,
    };

    const expected = [CHECK_ANSWERS, DECLARATIONS_AND_SUBMIT];

    expect(result).toEqual(expected);
  });
});
