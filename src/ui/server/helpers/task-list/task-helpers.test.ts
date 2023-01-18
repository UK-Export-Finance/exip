import {
  getGroupById,
  getTaskById,
  getAllTasksFieldsInAGroup,
  hasSubmittedField,
  getSubmittedFields,
  taskIsInProgress,
  taskIsComplete,
  areTaskDependenciesMet,
  taskStatus,
  taskLink,
} from './task-helpers';
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

      const expected = mockGroups[1];

      expect(result).toEqual(expected);
    });
  });

  describe('getTaskById', () => {
    it('should return a task that matches the provided id', () => {
      const mockTaskId = 'taskB';

      const result = getTaskById(mockGroupTasks, mockTaskId);

      const expected = mockGroupTasks[1];

      expect(result).toEqual(expected);
    });
  });

  describe('getAllTasksFieldsInAGroup', () => {
    describe('when no group is provided', () => {
      it('should return an empty array', () => {
        // @ts-ignore
        const result = getAllTasksFieldsInAGroup();

        expect(result).toEqual([]);
      });
    });

    describe('when a group has no tasks', () => {
      it('should return an empty array', () => {
        // @ts-ignore
        const result = getAllTasksFieldsInAGroup({});

        expect(result).toEqual([]);
      });
    });

    describe('when a group has an empty array of tasks', () => {
      it('should return an empty array', () => {
        // @ts-ignore
        const result = getAllTasksFieldsInAGroup({ tasks: [] });

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

  describe('hasSubmittedField', () => {
    describe('when submitted data has the given field id', () => {
      it('should return true', () => {
        const result = hasSubmittedField(mockApplicationFlat, 'hasMinimumUkGoodsOrServices');

        expect(result).toEqual(true);
      });

      it('should return true when array is populated', () => {
        const result = hasSubmittedField(mockApplicationFlat, 'sicCodes');

        expect(result).toEqual(true);
      });

      describe('when the field value is false boolean', () => {
        it('should return true', () => {
          const result = hasSubmittedField(mockApplicationFlat, 'wantCoverOverMaxAmount');

          expect(result).toEqual(true);
        });
      });
    });

    describe('when submitted data does NOT have the given field id', () => {
      it('should return false', () => {
        const result = hasSubmittedField(mockApplicationFlat, 'mockField');

        expect(result).toEqual(false);
      });
    });

    describe('when submitted data or fieldId is not provided', () => {
      it('should return false', () => {
        // @ts-ignore
        const result = hasSubmittedField();

        expect(result).toEqual(false);
      });

      it('should return false when array is empty', () => {
        const mockApplicationNoSic = {
          ...mockApplication,
        };

        mockApplicationNoSic.exporterCompany.sicCodes = [];
        const mockApplicationNoSicFlat = flattenApplicationData(mockApplicationNoSic);

        const result = hasSubmittedField(mockApplicationNoSicFlat, 'sicCodes');

        expect(result).toEqual(false);
      });
    });
  });

  describe('getSubmittedFields', () => {
    it('should return fields that are provided and also in provided submitted fields', () => {
      const mockFields = ['wantCoverOverMaxAmount', 'wantCoverOverMaxPeriod', 'mockField'];

      const result = getSubmittedFields(mockFields, mockApplicationFlat);

      const expected = ['wantCoverOverMaxAmount', 'wantCoverOverMaxPeriod'];

      expect(result).toEqual(expected);
    });

    describe('when no fields are provided', () => {
      it('should return empty array', () => {
        const result = getSubmittedFields([], mockApplicationFlat);

        expect(result).toEqual([]);
      });
    });
  });

  describe('taskIsInProgress', () => {
    describe('when all relevant fields have NOT been submitted', () => {
      it('should return true', () => {
        const mockFields = ['wantCoverOverMaxAmount', 'wantCoverOverMaxPeriod'];

        const mockApplicationIncomplete = {
          wantCoverOverMaxAmount: mockApplicationFlat.wantCoverOverMaxAmount,
        } as ApplicationFlat;

        const result = taskIsInProgress(mockFields, mockApplicationIncomplete);

        expect(result).toEqual(true);
      });
    });

    describe('when all relevant fields have been submitted', () => {
      it('should return false', () => {
        const mockFields = ['wantCoverOverMaxAmount', 'wantCoverOverMaxPeriod'];

        const result = taskIsInProgress(mockFields, mockApplicationFlat);

        expect(result).toEqual(false);
      });
    });
  });

  describe('taskIsComplete', () => {
    describe('when all relevant fields have been submitted', () => {
      it('should return true', () => {
        const mockFields = ['wantCoverOverMaxAmount', 'wantCoverOverMaxPeriod'];

        const result = taskIsComplete(mockFields, mockApplicationFlat);

        expect(result).toEqual(true);
      });
    });

    describe('when all relevant fields have NOT been submitted', () => {
      it('should return false', () => {
        const mockFields = ['wantCoverOverMaxAmount', 'wantCoverOverMaxPeriod', 'mockField'];

        const result = taskIsComplete(mockFields, mockApplicationFlat);

        expect(result).toEqual(false);
      });
    });
  });

  describe('areTaskDependenciesMet', () => {
    describe('when all dependencies are in submitted data', () => {
      it('should return true', () => {
        const mockDeps = ['wantCoverOverMaxAmount', 'wantCoverOverMaxPeriod'];

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
          dependencies: ['wantCoverOverMaxAmount', 'wantCoverOverMaxPeriod'],
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
          dependencies: ['wantCoverOverMaxAmount'],
        };

        // @ts-ignore
        const mockApplicationHalfComplete = {
          wantCoverOverMaxAmount: mockApplicationFlat.wantCoverOverMaxAmount,
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
          fields: ['wantCoverOverMaxAmount', 'wantCoverOverMaxPeriod'],
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
      it('should return null', () => {
        const result = taskLink(mockTaskLink, TASKS.STATUS.CANNOT_START);

        expect(result).toEqual(null);
      });
    });
  });
});
