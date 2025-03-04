import { addYear, now, getISO8601, getEpochMs } from './index';

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
      const date = now().getDate().toString().padStart(2, '0');

      expect(result).toContain(`${year}-${month}-${date}`);
      expect(result).toContain('T');
      expect(result).toContain('Z');
    });

    it('should return the current date and time in ISO 8601 format', () => {
      const result = getISO8601();
      const year = now().getFullYear();
      const month = (now().getMonth() + 1).toString().padStart(2, '0');
      const date = now().getDate().toString().padStart(2, '0');

      expect(result).toContain(`${year}-${month}-${date}`);
      expect(result).toContain('T');
      expect(result).toContain('Z');
    });

    it('should return the provided date in ISO 8601 format', () => {
      const date = new Date('2023-01-01T00:00:00Z');
      const expected = date.toISOString();

      const result = getISO8601(date);

      expect(result).toEqual(expected);
    });

    it('should handle leap year dates correctly', () => {
      const date = new Date('2020-02-29T00:00:00Z');
      const expected = date.toISOString();

      const result = getISO8601(date);

      expect(result).toEqual(expected);
    });

    it('should handle dates before 1970 correctly', () => {
      const date = new Date('1969-12-31T23:59:59Z');
      const expected = date.toISOString();

      const result = getISO8601(date);

      expect(result).toEqual(expected);
    });

    it('should handle future dates correctly', () => {
      const date = new Date('2100-01-01T00:00:00Z');
      const expected = date.toISOString();

      const result = getISO8601(date);

      expect(result).toEqual(expected);
    });
  });

  describe('addYear', () => {
    const yearsToAdd = [
      {
        year: 0,
      },
      {
        year: 1,
      },
      {
        year: 2,
      },
      {
        year: 10,
      },
      {
        year: 100,
      },
      {
        year: 1000,
      },
      {
        year: 3000,
      },
      {
        year: 10000,
      },
    ];

    it.each(yearsToAdd)('should add $year year(s) to the provided date object', ({ year }) => {
      const pastDate = new Date('1989-09-20');
      const expectedYear = pastDate.getFullYear() + year;
      // JavaScript months are 0 indexed
      const expectedMonth = 8;
      const expectedDate = 20;

      const result = addYear(year, pastDate);

      expect(result.getFullYear()).toEqual(expectedYear);
      expect(result.getMonth()).toEqual(expectedMonth);
      expect(result.getDate()).toEqual(expectedDate);
    });

    it.each(yearsToAdd)('should add $year year(s) with no date argument', ({ year }) => {
      const todayDate = now();
      const expectedYear = todayDate.getFullYear() + year;
      // JavaScript months are 0 indexed
      const expectedMonth = todayDate.getMonth();
      const expectedDate = todayDate.getDate();

      const result = addYear(year, todayDate);

      expect(result.getFullYear()).toEqual(expectedYear);
      expect(result.getMonth()).toEqual(expectedMonth);
      expect(result.getDate()).toEqual(expectedDate);
    });
  });

  describe('getEpochMs', () => {
    it('should return EPOCH with milliseconds for now with an argument', () => {
      const date = new Date();
      const epoch = date.valueOf();

      const result = getEpochMs(date);

      expect(result).toEqual(epoch);
    });

    it('should return EPOCH with milliseconds for now with no argument', () => {
      const epoch = new Date().valueOf();

      const result = getEpochMs();

      expect(result).toEqual(epoch);
    });

    it('should return EPOCH with milliseconds for 20/09/1989', () => {
      const date = new Date('1989-09-20');
      const epoch = date.valueOf();

      const result = getEpochMs(date);

      expect(result).toEqual(epoch);
    });

    it('should return EPOCH with milliseconds for 01/01/1970', () => {
      const date = new Date('1970-01-01');

      const result = getEpochMs(date);

      expect(result).toEqual(0);
    });

    it('should return EPOCH with milliseconds for a future date', () => {
      const date = new Date('2100-01-01');
      const epoch = date.valueOf();

      const result = getEpochMs(date);

      expect(result).toEqual(epoch);
    });

    it('should return EPOCH with milliseconds for a leap year date', () => {
      const date = new Date('2020-02-29');
      const epoch = date.valueOf();

      const result = getEpochMs(date);

      expect(result).toEqual(epoch);
    });
  });
});
