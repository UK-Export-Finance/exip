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
  CHECK_YOUR_ANSWERS: { ELIGIBILITY },
} = INSURANCE_ROUTES;

const {
  CHECK_YOUR_ANSWERS,
  CHECK_YOUR_ANSWERS: { POLICY_AND_EXPORT, EXPORTER_BUSINESS, BUYER },
} = FIELD_IDS.INSURANCE;

describe('server/helpers/task-list/submit-application', () => {
  it('should return EXIP `submit application` tasks', () => {
    const { referenceNumber, policyAndExport, exporterBroker, declaration } = mockApplication;

    const groupsAndTasks = generateGroupsAndTasks(
      referenceNumber,
      policyAndExport.policyType,
      exporterBroker.isUsingBroker,
      declaration.hasAntiBriberyCodeOfConduct,
    );

    const initialChecksGroup = groupsAndTasks[0];
    const prepareApplicationGroup = groupsAndTasks[1];

    const previousGroups = [initialChecksGroup, prepareApplicationGroup];

    const result = createSubmitApplicationTasks(referenceNumber, previousGroups, declaration.hasAntiBriberyCodeOfConduct);

    const initialChecksFields = getAllTasksFieldsInAGroup(initialChecksGroup);
    const prepareApplicationFields = getAllTasksFieldsInAGroup(prepareApplicationGroup);

    const expectedDependencies = [...initialChecksFields, ...prepareApplicationFields];

    const CHECK_ANSWERS = {
      href: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${ELIGIBILITY}`,
      title: SUBMIT_APPLICATION.TASKS.CHECK_ANSWERS,
      id: TASK_IDS.SUBMIT_APPLICATION.CHECK_ANSWERS,
      fields: [CHECK_YOUR_ANSWERS.ELIGIBILITY, POLICY_AND_EXPORT, EXPORTER_BUSINESS, BUYER],
      dependencies: expectedDependencies,
    };

    const DECLARATIONS_AND_SUBMIT = {
      href: `${INSURANCE_ROOT}/${referenceNumber}${CONFIDENTIALITY}`,
      title: SUBMIT_APPLICATION.TASKS.DECLARATIONS_AND_SUBMIT,
      id: TASK_IDS.SUBMIT_APPLICATION.DECLARATIONS_AND_SUBMIT,
      fields: declarationsRequiredFields(declaration.hasAntiBriberyCodeOfConduct),
      dependencies: expectedDependencies,
    };

    const expected = [CHECK_ANSWERS, DECLARATIONS_AND_SUBMIT];

    expect(result).toEqual(expected);
  });
});
