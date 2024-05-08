import mapAndGenerateInactiveApplicationsSaveArray from '.';
import { APPLICATION } from '../../constants';

const { IN_PROGRESS, ABANDONED } = APPLICATION.STATUS;

describe('helpers/map-inactive-applications', () => {
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

      const [application0, application1] = applications;

      const expected = [
        {
          where: { id: application0.id },
          data: {
            status: ABANDONED,
            previousStatus: application0.status,
            updatedAt: new Date(),
          },
        },
        {
          where: { id: application1.id },
          data: {
            status: ABANDONED,
            previousStatus: application1.status,
            updatedAt: new Date(),
          },
        },
      ];

      expect(result).toEqual(expected);
    });
  });
});
