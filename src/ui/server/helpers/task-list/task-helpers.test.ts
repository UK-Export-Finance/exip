import { getGroupById, getTaskById, getSubmittedFields, taskIsInProgress, taskIsComplete, areTaskDependenciesMet, taskStatus } from './task-helpers';
import { TaskListData, TaskListDataTask } from '../../../types';
import { TASKS } from '../../content-strings';

describe('server/helpers/task-helpers', () => {
  const mockSubmittedData = {
    wantCoverOverMaxAmount: true,
    wantCoverOverMaxPeriod: true,
  };

  describe('getGroupById', () => {
    it('should return a group that matches the provided id', () => {
      const mockGroups = [
        { title: 'Group A', id: 'groupA', tasks: [] },
        { title: 'Group B', id: 'groupB', tasks: [] },
        { title: 'Group C', id: 'groupC', tasks: [] },
      ] as TaskListData;

      const mockGroupId = 'groupB';

      const result = getGroupById(mockGroups, mockGroupId);

      const expected = mockGroups[1];

      expect(result).toEqual(expected);
    });
  });

  describe('getTaskById', () => {
    it('should return a task that matches the provided id', () => {
      const mockGroupTasks = [
        { title: 'Task A', id: 'taskA' },
        { title: 'Task B', id: 'taskB' },
        { title: 'Task C', id: 'taskC' },
      ] as Array<TaskListDataTask>;

      const mockTaskId = 'taskB';

      const result = getTaskById(mockGroupTasks, mockTaskId);

      const expected = mockGroupTasks[1];

      expect(result).toEqual(expected);
    });
  });

  describe('getSubmittedFields', () => {
    it('should return fields that are provided and also in provided submitted fields', () => {
      const mockFields = ['wantCoverOverMaxAmount', 'wantCoverOverMaxPeriod', 'mockField'];

      const result = getSubmittedFields(mockFields, mockSubmittedData);

      const expected = ['wantCoverOverMaxAmount', 'wantCoverOverMaxPeriod'];

      expect(result).toEqual(expected);
    });

    describe('when no fields are provided', () => {
      it('should return empty array', () => {
        const result = getSubmittedFields([], mockSubmittedData);

        expect(result).toEqual([]);
      });
    });
  });

  describe('taskIsInProgress', () => {
    describe('when all relevant fields have NOT been submitted', () => {
      it('should return true', () => {
        const mockFields = ['wantCoverOverMaxAmount', 'wantCoverOverMaxPeriod'];

        const mockSubmittedDataIncomplete = {
          wantCoverOverMaxAmount: mockSubmittedData.wantCoverOverMaxAmount,
        };

        const result = taskIsInProgress(mockFields, mockSubmittedDataIncomplete);

        expect(result).toEqual(true);
      });
    });

    describe('when all relevant fields have been submitted', () => {
      it('should return false', () => {
        const mockFields = ['wantCoverOverMaxAmount', 'wantCoverOverMaxPeriod'];

        const result = taskIsInProgress(mockFields, mockSubmittedData);

        expect(result).toEqual(false);
      });
    });
  });

  describe('taskIsComplete', () => {
    describe('when all relevant fields have been submitted', () => {
      it('should return true', () => {
        const mockFields = ['wantCoverOverMaxAmount', 'wantCoverOverMaxPeriod'];

        const result = taskIsComplete(mockFields, mockSubmittedData);

        expect(result).toEqual(true);
      });
    });

    describe('when all relevant fields have NOT been submitted', () => {
      it('should return false', () => {
        const mockFields = ['wantCoverOverMaxAmount', 'wantCoverOverMaxPeriod', 'mockField'];

        const result = taskIsComplete(mockFields, mockSubmittedData);

        expect(result).toEqual(false);
      });
    });
  });

  describe('areTaskDependenciesMet', () => {
    describe('when all dependencies are in submitted data', () => {
      it('should return true', () => {
        const mockDeps = ['wantCoverOverMaxAmount', 'wantCoverOverMaxPeriod'];

        const result = areTaskDependenciesMet(mockDeps, mockSubmittedData);

        expect(result).toEqual(true);
      });
    });

    describe('when all dependencies are NOT in submitted data', () => {
      it('should return false', () => {
        const mockDeps = ['mockField'];

        const result = areTaskDependenciesMet(mockDeps, mockSubmittedData);

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
          fields: [''],
          dependencies: ['amount', 'mockField'],
        };

        const result = taskStatus(mockTask, mockSubmittedData);

        expect(result).toEqual(TASKS.STATUS.CANNOT_START);
      });
    });

    describe('when task dependencies are met and task fields are NOT in progress or complete', () => {
      it(`should return ${TASKS.STATUS.START_NOW} status`, () => {
        const mockTask = {
          title: 'Mock',
          id: 'mock',
          fields: ['fieldA', 'fieldB'],
          dependencies: ['wantCoverOverMaxAmount', 'wantCoverOverMaxPeriod'],
        };

        const result = taskStatus(mockTask, mockSubmittedData);

        expect(result).toEqual(TASKS.STATUS.START_NOW);
      });
    });

    describe('when task dependencies are met and task fields are in progress', () => {
      it(`should return ${TASKS.STATUS.IN_PROGRESS} status`, () => {
        const mockTask = {
          title: 'Mock',
          id: 'mock',
          fields: ['fieldA', 'fieldB'],
          dependencies: ['wantCoverOverMaxAmount'],
        };

        const mockSubmittedDataHalfComplete = {
          wantCoverOverMaxAmount: mockSubmittedData.wantCoverOverMaxAmount,
          fieldA: 'mock',
        };

        const result = taskStatus(mockTask, mockSubmittedDataHalfComplete);

        expect(result).toEqual(TASKS.STATUS.IN_PROGRESS);
      });
    });

    describe('when all task fields are complete', () => {
      it(`should return ${TASKS.STATUS.COMPLETED} status`, () => {
        const mockTask = {
          title: 'Mock',
          id: 'mock',
          fields: ['wantCoverOverMaxAmount', 'wantCoverOverMaxPeriod'],
          dependencies: [],
        };

        const result = taskStatus(mockTask, mockSubmittedData);

        expect(result).toEqual(TASKS.STATUS.COMPLETED);
      });
    });
  });
});
