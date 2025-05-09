import createSubmitApplicationTasks from './submit-application';
import { getAllTasksFieldsInAGroup } from '../task-helpers';
import generateGroupsAndTasks from '.';
import { FIELD_IDS, TASK_IDS } from '../../../constants';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import { TASKS } from '../../../content-strings';
import declarationsRequiredFields from '../../required-fields/declarations';
import { mockApplication } from '../../../test-mocks';

const { SUBMIT_APPLICATION } = TASKS.LIST;

const {
  INSURANCE_ROOT,
  DECLARATIONS: { CONFIDENTIALITY },
  CHECK_YOUR_ANSWERS: { YOUR_BUSINESS },
} = INSURANCE_ROUTES;

const {
  CHECK_YOUR_ANSWERS: { BUYER, EXPORTER_BUSINESS, EXPORT_CONTRACT, POLICY },
} = FIELD_IDS.INSURANCE;

describe('server/helpers/task-list/submit-application', () => {
  it('should return EXIP `submit application` tasks', () => {
    const { referenceNumber, policy, broker, declaration } = mockApplication;

    const { policyType } = policy;
    const { isUsingBroker } = broker;
    const { hasAntiBriberyCodeOfConduct } = declaration;

    const groupsAndTasks = generateGroupsAndTasks(referenceNumber, declaration, policyType, isUsingBroker, hasAntiBriberyCodeOfConduct);

    const [initialChecksGroup, prepareApplicationGroup] = groupsAndTasks;

    const previousGroups = [initialChecksGroup, prepareApplicationGroup];

    const result = createSubmitApplicationTasks(referenceNumber, previousGroups, declaration);

    const initialChecksFields = getAllTasksFieldsInAGroup(initialChecksGroup);
    const prepareApplicationFields = getAllTasksFieldsInAGroup(prepareApplicationGroup);

    const expectedCoreDependencies = [...initialChecksFields, ...prepareApplicationFields];

    const CHECK_ANSWERS = {
      href: `${INSURANCE_ROOT}/${referenceNumber}${YOUR_BUSINESS}`,
      title: SUBMIT_APPLICATION.TASKS.CHECK_ANSWERS,
      id: TASK_IDS.SUBMIT_APPLICATION.CHECK_ANSWERS,
      fields: [BUYER, EXPORTER_BUSINESS, EXPORT_CONTRACT, POLICY],
      dependencies: expectedCoreDependencies,
    };

    const DECLARATIONS_AND_SUBMIT = {
      href: `${INSURANCE_ROOT}/${referenceNumber}${CONFIDENTIALITY}`,
      title: SUBMIT_APPLICATION.TASKS.DECLARATIONS_AND_SUBMIT,
      id: TASK_IDS.SUBMIT_APPLICATION.DECLARATIONS_AND_SUBMIT,
      fields: declarationsRequiredFields(declaration),
      dependencies: [...expectedCoreDependencies, ...CHECK_ANSWERS.fields],
    };

    const expected = [CHECK_ANSWERS, DECLARATIONS_AND_SUBMIT];

    expect(result).toEqual(expected);
  });
});
