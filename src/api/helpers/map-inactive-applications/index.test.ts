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

      expect(result[0].where).toEqual({ id: application0.id });
      expect(result[0].data.status).toEqual(ABANDONED);
      expect(result[0].data.previousStatus).toEqual(application0.status);
      expect(result[0].data.updatedAt).toBeDefined();

      expect(result[1].where).toEqual({ id: application1.id });
      expect(result[1].data.status).toEqual(ABANDONED);
      expect(result[1].data.previousStatus).toEqual(application1.status);
      expect(result[1].data.updatedAt).toBeDefined();
    });
  });
});
