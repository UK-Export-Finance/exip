import generateGroupsAndTasks from '.';
import initialChecksTasks from './initial-checks';
import prepareApplicationTasks from './prepare-application';
import submitApplicationTasks from './submit-application';
import { TASKS } from '../../../content-strings';
import { GROUP_IDS } from '../../../constants';
import { mockApplication } from '../../../test-mocks';

const { INITIAL_CHECKS, PREPARE_APPLICATION, SUBMIT_APPLICATION } = TASKS.LIST;

describe('server/helpers/task-list/generate-groups-and-tasks', () => {
  const { referenceNumber, policy, broker, declaration } = mockApplication;

  const { policyType } = policy;
  const { isUsingBroker } = broker;
  const { hasAntiBriberyCodeOfConduct } = declaration;

  it('should return EXIP groups and tasks', () => {
    const result = generateGroupsAndTasks(referenceNumber, policyType, isUsingBroker, hasAntiBriberyCodeOfConduct);

    const initialChecks = {
      title: INITIAL_CHECKS.HEADING,
      id: GROUP_IDS.INITIAL_CHECKS,
      tasks: initialChecksTasks(),
    };

    const prepareApplication = {
      title: PREPARE_APPLICATION.HEADING,
      hint: PREPARE_APPLICATION.HINT,
      id: GROUP_IDS.PREPARE_APPLICATION,
      tasks: prepareApplicationTasks(referenceNumber, [initialChecks], policyType, isUsingBroker),
    };

    const submitApplication = {
      title: SUBMIT_APPLICATION.HEADING,
      id: GROUP_IDS.SUBMIT_APPLICATION,
      tasks: submitApplicationTasks(referenceNumber, [initialChecks, prepareApplication], hasAntiBriberyCodeOfConduct),
    };

    const expected = [initialChecks, prepareApplication, submitApplication];

    expect(result).toEqual(expected);
  });
});
