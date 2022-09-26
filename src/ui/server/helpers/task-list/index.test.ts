import generateTaskList, { generateTaskStates, generateSimplifiedTaskList } from '.';
import { taskStatus } from './task-helpers';
import generateGroupsAndTasks from './generate-groups-and-tasks';

describe('server/helpers/task-list', () => {
  const mockSubmittedData = {};

  describe('generateTaskStates', () => {
    it('should return an object of groups and tasks with task statuses', () => {
      const mockTaskListData = generateGroupsAndTasks();

      const result = generateTaskStates(mockTaskListData, mockSubmittedData);

      const taskStateMapper = (groupKey: string, taskKey: string) => {
        // const task = mockTaskListData.INITIAL_CHECKS.tasks[taskKey];
        const task = mockTaskListData[groupKey].tasks[taskKey];

        return {
          href: task.href,
          title: task.title,
          id: task.id,
          status: taskStatus(task, mockSubmittedData),
        };
      };

      const expectedTasks = {
        initialChecks: () => {
          const mapped = {};
          const taskKeys = Object.keys(mockTaskListData.INITIAL_CHECKS.tasks);

          taskKeys.forEach((taskKey: string) => {
            mapped[taskKey] = taskStateMapper('INITIAL_CHECKS', taskKey);
          });

          return mapped;
        },
        prepareApplication: () => {
          const mapped = {};
          const taskKeys = Object.keys(mockTaskListData.PREPARE_APPLICATION.tasks);

          taskKeys.forEach((taskKey: string) => {
            mapped[taskKey] = taskStateMapper('PREPARE_APPLICATION', taskKey);
          });

          return mapped;
        },
      };

      const expected = {
        INITIAL_CHECKS: {
          ...mockTaskListData.INITIAL_CHECKS,
          tasks: expectedTasks.initialChecks(),
        },
        PREPARE_APPLICATION: {
          ...mockTaskListData.PREPARE_APPLICATION,
          tasks: expectedTasks.prepareApplication(),
        },
      };

      expect(result).toEqual(expected);
    });
  });

  describe('generateSimplifiedTaskList', () => {
    it('should return a simplified task list in an array of objects structure', () => {
      const mockTaskListData = generateGroupsAndTasks();
      const taskListDataWithStates = generateTaskStates(mockTaskListData, mockSubmittedData);

      const result = generateSimplifiedTaskList(taskListDataWithStates);

      const expected = [
        {
          title: mockTaskListData.INITIAL_CHECKS.title,
          tasks: Object.values(mockTaskListData.INITIAL_CHECKS.tasks).map((task) => ({
            id: task.id,
            href: task.href,
            status: task.status,
            title: task.title,
          })),
        },
        {
          title: mockTaskListData.PREPARE_APPLICATION.title,
          tasks: Object.values(mockTaskListData.PREPARE_APPLICATION.tasks).map((task) => ({
            id: task.id,
            href: task.href,
            status: task.status,
            title: task.title,
          })),
        },
      ];

      expect(result).toEqual(expected);
    });
  });

  describe('generateTaskList', () => {
    it('should return a simplified task list with statuses', () => {
      const mockTaskListData = generateGroupsAndTasks();

      const result = generateTaskList(mockTaskListData, mockSubmittedData);

      const withStatuses = generateTaskStates(mockTaskListData, mockSubmittedData);

      const expected = generateSimplifiedTaskList(withStatuses);

      expect(result).toEqual(expected);
    });
  });
});
