import mapAndGenerateInactiveApplicationsSaveArray from '.';
import { APPLICATION } from '../../constants';

const { IN_PROGRESS, ABANDONED } = APPLICATION.STATUS;

describe('helpers/map-and-generate-inactive-applications-save-array', () => {
  describe('when an empty array is passed', () => {
    it('should return an empty array', () => {
      const result = mapAndGenerateInactiveApplicationsSaveArray([]);

      expect(result).toEqual([]);
    });
  });

  describe('when an array is passed', () => {
    const applications = [
      {
        id: '1',
        status: IN_PROGRESS,
      },
      {
        id: '2',
        status: IN_PROGRESS,
      },
    ];

    it('should return a populated array', () => {
      const result = mapAndGenerateInactiveApplicationsSaveArray(applications);

      const expected = [
        {
          where: { id: applications[0].id },
          data: {
            status: ABANDONED,
            previousStatus: applications[0].status,
          },
        },
        {
          where: { id: applications[1].id },
          data: {
            status: ABANDONED,
            previousStatus: applications[1].status,
          },
        },
      ];

      expect(result).toEqual(expected);
    });
  });
});
