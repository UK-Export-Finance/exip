import generateGroupsAndTasks from '.';
import { TaskListData } from '../../../../types';
import initialChecksTasks from './initial-checks';
import prepeApplicationTasks from './prepare-application';
import { TASKS } from '../../../content-strings';
import { GROUP_IDS } from '../../../constants';

describe('server/helpers/task-list/generate-groups-and-tasks', () => {
  it('should return EXIP groups and tasks', () => {
    const result = generateGroupsAndTasks();

    const groups = [
      {
        title: TASKS.LIST.INITIAL_CHECKS.TITLE,
        id: GROUP_IDS.INITIAL_CHECKS,
        tasks: initialChecksTasks(),
      },
    ] as TaskListData;

    const expected = [
      ...groups,
      {
        title: TASKS.LIST.PREPARE_APPLICATION.TITLE,
        id: GROUP_IDS.PREPARE_APPLICATION,
        tasks: prepeApplicationTasks(groups),
      },
    ];

    expect(result).toEqual(expected);
  });
});
