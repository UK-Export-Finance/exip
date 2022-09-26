import generateGroupsAndTasks from '.';
import { TaskListData } from '../../../../types';
import initialChecksTasks from './initial-checks';
import prepeApplicationTasks from './prepare-application';
import { TASKS } from '../../../content-strings';

describe('server/helpers/task-list/generate-groups-and-tasks', () => {
  it('should return EXIP groups and tasks', () => {
    const result = generateGroupsAndTasks();

    const groups = {
      INITIAL_CHECKS: {
        title: TASKS.LIST.INITIAL_CHECKS.TITLE,
        tasks: initialChecksTasks(),
      },
    } as TaskListData;

    const expected = {
      ...groups,
      PREPARE_APPLICATION: {
        title: TASKS.LIST.PREPARE_APPLICATION.TITLE,
        tasks: prepeApplicationTasks(groups),
      },
    };

    expect(result).toEqual(expected);
  });
});
