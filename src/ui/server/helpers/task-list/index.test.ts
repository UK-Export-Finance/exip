import generateTaskList, { mapTask, generateTaskStatusesAndLinks, generateSimplifiedTaskList } from '.';
import { taskStatus, taskLink } from './task-helpers';
import generateGroupsAndTasks from './generate-groups-and-tasks';
import flattenApplicationData from '../flatten-application-data';
import { mockApplication } from '../../test-mocks';

describe('server/helpers/task-list', () => {
  const mockApplicationFlat = flattenApplicationData(mockApplication);
  const mockTaskListData = generateGroupsAndTasks(mockApplication.referenceNumber);

  const { 0: mockTaskGroup } = mockTaskListData;
  const { tasks: group1Tasks } = mockTaskGroup;
  const { 0: mockTask } = group1Tasks;

  describe('mapTask', () => {
    describe('when a task has a href', () => {
      it('should return a task with status and href', () => {
        const mockTaskWithHref = {
          ...mockTask,
          href: '/mock',
        };

        const result = mapTask(mockTaskWithHref, mockApplicationFlat);

        const expectedStatus = taskStatus(mockTaskWithHref, mockApplicationFlat);

        const expected = {
          ...mockTaskWithHref,
          status: expectedStatus,
          href: taskLink(mockTaskWithHref.href, expectedStatus),
        };

        expect(result).toEqual(expected);
      });
    });

    describe('when a task does NOT have a href', () => {
      it('should return a task with status, no href', () => {
        const result = mapTask(mockTask, mockApplicationFlat);

        const expected = {
          ...mockTask,
          status: taskStatus(mockTask, mockApplicationFlat),
        };

        expect(result).toEqual(expected);
      });
    });
  });

  describe('generateTaskStatusesAndLinks', () => {
    it('should return an array of groups and tasks with task statuses', () => {
      const result = generateTaskStatusesAndLinks(mockTaskListData, mockApplicationFlat);

      const expectedTasks = {
        initialChecks: () => {
          return group1Tasks.map((task) => mapTask(task, mockApplicationFlat));
        },
        prepareApplication: () => {
          const { 1: tasksListData } = mockTaskListData;
          const { tasks: group2Tasks } = tasksListData;

          return group2Tasks.map((task) => mapTask(task, mockApplicationFlat));
        },
        submitApplication: () => {
          const { 2: tasksListData } = mockTaskListData;
          const { tasks: group3Tasks } = tasksListData;

          return group3Tasks.map((task) => mapTask(task, mockApplicationFlat));
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
        {
          ...mockTaskListData[2],
          tasks: expectedTasks.submitApplication(),
        },
      ];

      expect(result).toEqual(expected);
    });
  });

  describe('generateSimplifiedTaskList', () => {
    it('should return a simplified task list in an array of objects structure', () => {
      const taskListDataWithStates = generateTaskStatusesAndLinks(mockTaskListData, mockApplicationFlat);

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
        {
          title: taskListDataWithStates[2].title,
          tasks: Object.values(taskListDataWithStates[2].tasks).map((task) => ({
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
      const result = generateTaskList(mockTaskListData, mockApplicationFlat);

      const withStatusesAndLinks = generateTaskStatusesAndLinks(mockTaskListData, mockApplicationFlat);

      const expected = generateSimplifiedTaskList(withStatusesAndLinks);

      expect(result).toEqual(expected);
    });
  });
});
