import generateTaskList, { generateTaskStatusesAndLinks, generateSimplifiedTaskList } from '.';
import { taskStatus, taskLink } from './task-helpers';
import generateGroupsAndTasks from './generate-groups-and-tasks';
import flattenApplicationData from '../flatten-application-data';
import { TaskListDataTask, ApplicationFlat } from '../../../types';
import { mockApplication } from '../../test-mocks';

describe('server/helpers/task-list', () => {
  const mockApplicationFlat = flattenApplicationData(mockApplication);

  describe('generateTaskStatusesAndLinks', () => {
    it('should return an array of groups and tasks with task statuses', () => {
      const mockTaskListData = generateGroupsAndTasks(mockApplication.referenceNumber);

      const result = generateTaskStatusesAndLinks(mockTaskListData, mockApplicationFlat);

      const mapTask = (task: TaskListDataTask, application: ApplicationFlat) => {
        const status = taskStatus(task, application);

        return {
          ...task,
          status,
          href: taskLink(task.href, status),
        };
      };

      const expectedTasks = {
        initialChecks: () => {
          const [tasks] = mockTaskListData;
          return tasks.map((task) => mapTask(task, mockApplicationFlat));
        },
        prepareApplication: () => {
          const { 1: tasks } = mockTaskListData;
          return tasks.map((task) => mapTask(task, mockApplicationFlat));
        },
        submitApplication: () => {
          const { 2: tasks } = mockTaskListData;
          return tasks.map((task) => mapTask(task, mockApplicationFlat));
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
      const mockTaskListData = generateGroupsAndTasks(mockApplication.referenceNumber);
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
      const mockTaskListData = generateGroupsAndTasks(mockApplication.referenceNumber);

      const result = generateTaskList(mockTaskListData, mockApplicationFlat);

      const withStatusesAndLinks = generateTaskStatusesAndLinks(mockTaskListData, mockApplicationFlat);

      const expected = generateSimplifiedTaskList(withStatusesAndLinks);

      expect(result).toEqual(expected);
    });
  });
});
