import { getGroupById, getTaskById, getAllTasksFieldsInAGroup, areTaskDependenciesMet, taskStatus, taskLink } from './task-helpers';
import { ApplicationFlat, TaskListData, TaskListDataTask } from '../../../types';
import { TASKS } from '../../content-strings';
import { mockApplication } from '../../test-mocks';
import flattenApplicationData from '../flatten-application-data';

describe('server/helpers/task-helpers', () => {
  const mockApplicationFlat = flattenApplicationData(mockApplication);

  const mockGroups = [
    { title: 'Group A', id: 'groupA', tasks: [] },
    { title: 'Group B', id: 'groupB', tasks: [] },
    { title: 'Group C', id: 'groupC', tasks: [] },
  ] as TaskListData;

  const mockGroupTasks = [
    { title: 'Task A', id: 'taskA', fields: ['a', 'b'] },
    { title: 'Task B', id: 'taskB', fields: ['c', 'd'] },
    { title: 'Task C', id: 'taskC', fields: ['e', 'f'] },
  ] as Array<TaskListDataTask>;

  describe('getGroupById', () => {
    it('should return a group that matches the provided id', () => {
      const mockGroupId = 'groupB';

      const result = getGroupById(mockGroups, mockGroupId);

      const { 1: expected } = mockGroups;

      expect(result).toEqual(expected);
    });
  });

  describe('getTaskById', () => {
    it('should return a task that matches the provided id', () => {
      const mockTaskId = 'taskB';

      const result = getTaskById(mockGroupTasks, mockTaskId);

      const { 1: expected } = mockGroupTasks;

      expect(result).toEqual(expected);
    });
  });

  describe('getAllTasksFieldsInAGroup', () => {
    describe('when a group has an empty array of tasks', () => {
      it('should return an empty array', () => {
        const result = getAllTasksFieldsInAGroup(mockGroups[0]);

        expect(result).toEqual([]);
      });
    });

    it('should return all fields from every task in the group', () => {
      const mockGroup = {
        ...mockGroups[0],
        tasks: mockGroupTasks,
      };

      const result = getAllTasksFieldsInAGroup(mockGroup);

      const expected = [mockGroupTasks[0].fields, mockGroupTasks[1].fields, mockGroupTasks[2].fields].flat();

      expect(result).toEqual(expected);
    });
  });

  describe('areTaskDependenciesMet', () => {
    describe('when all dependencies are in submitted data', () => {
      it('should return true', () => {
        const mockDeps = ['hasCompaniesHouseNumber', 'wantCoverOverMaxPeriod'];

        const result = areTaskDependenciesMet(mockDeps, mockApplicationFlat);

        expect(result).toEqual(true);
      });
    });

    describe('when all dependencies are NOT in submitted data', () => {
      it('should return false', () => {
        const mockDeps = ['mockField'];

        const result = areTaskDependenciesMet(mockDeps, mockApplicationFlat);

        expect(result).toEqual(false);
      });
    });
  });

  describe('taskStatus', () => {
    describe('when task dependencies are not met', () => {
      it(`should return ${TASKS.STATUS.CANNOT_START} status`, () => {
        const mockTask = {
          title: 'Mock',
          id: 'mock',
          href: '#',
          fields: [''],
          dependencies: ['amount', 'mockField'],
        };

        const result = taskStatus(mockTask, mockApplicationFlat);

        expect(result).toEqual(TASKS.STATUS.CANNOT_START);
      });
    });

    describe('when task dependencies are met and task fields are NOT in progress or complete', () => {
      it(`should return ${TASKS.STATUS.NOT_STARTED_YET} status`, () => {
        const mockTask = {
          title: 'Mock',
          id: 'mock',
          href: '#',
          fields: ['fieldA', 'fieldB'],
          dependencies: ['hasCompaniesHouseNumber', 'wantCoverOverMaxPeriod'],
        };

        const result = taskStatus(mockTask, mockApplicationFlat);

        expect(result).toEqual(TASKS.STATUS.NOT_STARTED_YET);
      });
    });

    describe('when task dependencies are met and task fields are in progress', () => {
      it(`should return ${TASKS.STATUS.IN_PROGRESS} status`, () => {
        const mockTask = {
          title: 'Mock',
          id: 'mock',
          href: '#',
          fields: ['fieldA', 'fieldB'],
          dependencies: ['hasCompaniesHouseNumber'],
        };

        // @ts-ignore
        const mockApplicationHalfComplete = {
          hasCompaniesHouseNumber: mockApplicationFlat.hasCompaniesHouseNumber,
          fieldA: 'mock',
        } as ApplicationFlat;

        const result = taskStatus(mockTask, mockApplicationHalfComplete);

        expect(result).toEqual(TASKS.STATUS.IN_PROGRESS);
      });
    });

    describe('when all task fields are complete', () => {
      it(`should return ${TASKS.STATUS.COMPLETED} status`, () => {
        const mockTask = {
          title: 'Mock',
          id: 'mock',
          href: '#',
          fields: ['hasCompaniesHouseNumber', 'wantCoverOverMaxPeriod'],
          dependencies: [],
        };

        const result = taskStatus(mockTask, mockApplicationFlat);

        expect(result).toEqual(TASKS.STATUS.COMPLETED);
      });
    });
  });

  describe('taskLink', () => {
    const mockTaskLink = '#';

    describe(`when the task does NOT have a status of ${TASKS.STATUS.NOT_STARTED_YET}`, () => {
      it('should return the link', () => {
        const result = taskLink(mockTaskLink, TASKS.STATUS.NOT_STARTED_YET);

        const expected = mockTaskLink;

        expect(result).toEqual(expected);
      });
    });

    describe(`when the task has a status of ${TASKS.STATUS.CANNOT_START}`, () => {
      it('should return an empty string', () => {
        const result = taskLink(mockTaskLink, TASKS.STATUS.CANNOT_START);

        expect(result).toEqual('');
      });
    });
  });
});
