import generateGroupsAndTasks from '.';
import initialChecksTasks from './initial-checks';
import prepareApplicationTasks from './prepare-application';
import submitApplicationTasks from './submit-application';
import { TASKS } from '../../../content-strings';
import { GROUP_IDS } from '../../../constants';

describe('server/helpers/task-list/generate-groups-and-tasks', () => {
  it('should return EXIP groups and tasks', () => {
    const result = generateGroupsAndTasks();

    const initialChecks = {
      title: TASKS.LIST.INITIAL_CHECKS.HEADING,
      id: GROUP_IDS.INITIAL_CHECKS,
      tasks: initialChecksTasks(),
    };

    const prepareApplication = {
      title: TASKS.LIST.PREPARE_APPLICATION.HEADING,
      id: GROUP_IDS.PREPARE_APPLICATION,
      tasks: prepareApplicationTasks([initialChecks]),
    };

    const submitApplication = {
      title: TASKS.LIST.SUBMIT_APPLICATION.HEADING,
      id: GROUP_IDS.SUBMIT_APPLICATION,
      tasks: submitApplicationTasks([initialChecks, prepareApplication]),
    };

    const expected = [initialChecks, prepareApplication, submitApplication];

    expect(result).toEqual(expected);
  });
});
