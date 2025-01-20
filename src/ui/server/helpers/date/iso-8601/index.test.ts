import { addYear, now, getISO8601 } from './index';

describe('date helpers', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe('now', () => {
    it('should return now', () => {
      const response = now();

      expect(response).not.toBeNull();
    });

    it('should have imperative date functions', () => {
      const response = now();

      expect(response.getDate()).toBeDefined();
      expect(response.getMonth()).toBeDefined();
      expect(response.getFullYear()).toBeDefined();
    });
  });

  describe('getISO8601', () => {
    it('should return the current date and time in ISO 8601 format', () => {
      const result = getISO8601();
      const year = now().getFullYear();
      const month = (now().getMonth() + 1).toString().padStart(2, '0');
      const date = now().getDate();

      expect(result).toContain(`${year}-${month}-${date}`);
      expect(result).toContain('T');
      expect(result).toContain('Z');
    });
  });

  describe('addYEar', () => {
    it('should add one year provided date object', () => {
      const year = 1;
      const date = new Date('20-09-1989');
      const oneYear = date.getFullYear() + year;

      const result = addYear(year, date);

      expect(result.getFullYear()).toBe(oneYear);
    });

    it('should add ten years provided date object', () => {
      const year = 10;
      const date = new Date();
      const tenYears = date.getFullYear() + year;

      const result = addYear(year, date);

      expect(result.getFullYear()).toBe(tenYears);
    });

    it('should add two years to now', () => {
      const year = 2;
      const date = now();
      const twoYears = date.getFullYear() + year;

      const result = addYear(year);

      expect(result.getFullYear()).toBe(twoYears);
    });
  });
});
