import generateTaskList, { generateTaskStatuses, generateSimplifiedTaskList } from '.';
import { taskStatus } from './task-helpers';
import generateGroupsAndTasks from './generate-groups-and-tasks';
import { TaskListDataTask, SubmittedData } from '../../../types';

describe('server/helpers/task-list', () => {
  const mockSubmittedData = {};

  describe('generateTaskStatuses', () => {
    it('should return an array of groups and tasks with task statuses', () => {
      const mockTaskListData = generateGroupsAndTasks();

      const result = generateTaskStatuses(mockTaskListData, mockSubmittedData);

      const mapTask = (task: TaskListDataTask, submittedData: SubmittedData) => ({
        ...task,
        status: taskStatus(task, submittedData),
      });

      const expectedTasks = {
        initialChecks: () => {
          const { tasks } = mockTaskListData[0];
          return tasks.map((task) => mapTask(task, mockSubmittedData));
        },
        prepareApplication: () => {
          const { tasks } = mockTaskListData[1];
          return tasks.map((task) => mapTask(task, mockSubmittedData));
        },
      };

      const expected = [
        {
          ...mockTaskListData[0],
          tasks: expectedTasks.initialChecks(),
        },
        {
          ...mockTaskListData[1],
          tasks: expectedTasks.prepareApplication(),
        },
      ];

      expect(result).toEqual(expected);
    });
  });

  describe('generateSimplifiedTaskList', () => {
    it('should return a simplified task list in an array of objects structure', () => {
      const mockTaskListData = generateGroupsAndTasks();
      const taskListDataWithStates = generateTaskStatuses(mockTaskListData, mockSubmittedData);

      const result = generateSimplifiedTaskList(taskListDataWithStates);

      const expected = [
        {
          title: taskListDataWithStates[0].title,
          tasks: Object.values(taskListDataWithStates[0].tasks).map((task) => ({
            id: task.id,
            href: task.href,
            status: task.status,
            title: task.title,
          })),
        },
        {
          title: taskListDataWithStates[1].title,
          tasks: Object.values(taskListDataWithStates[1].tasks).map((task) => ({
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

      const withStatuses = generateTaskStatuses(mockTaskListData, mockSubmittedData);

      const expected = generateSimplifiedTaskList(withStatuses);

      expect(result).toEqual(expected);
    });
  });
});
