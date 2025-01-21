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
      // Act
      const response = now();

      // Assert
      expect(response).not.toBeNull();
    });

    it('should have imperative date functions', () => {
      // Act
      const response = now();

      // Assert
      expect(response.getDate()).toBeDefined();
      expect(response.getMonth()).toBeDefined();
      expect(response.getFullYear()).toBeDefined();
    });
  });

  describe('getISO8601', () => {
    it('should return the current date and time in ISO 8601 format', () => {
      // Act
      const result = getISO8601();
      const year = now().getFullYear();
      const month = (now().getMonth() + 1).toString().padStart(2, '0');
      const date = now().getDate();

      // Assert
      expect(result).toContain(`${year}-${month}-${date}`);
      expect(result).toContain('T');
      expect(result).toContain('Z');
    });

    it('should return the current date and time in ISO 8601 format', () => {
      // Act
      const result = getISO8601();
      const year = now().getFullYear();
      const month = (now().getMonth() + 1).toString().padStart(2, '0');
      const date = now().getDate();

      // Assert
      expect(result).toContain(`${year}-${month}-${date}`);
      expect(result).toContain('T');
      expect(result).toContain('Z');
    });

    it('should return the provided date in ISO 8601 format', () => {
      // Arrange
      const date = new Date('2023-01-01T00:00:00Z');
      const expected = date.toISOString();

      // Act
      const result = getISO8601(date);

      // Assert
      expect(result).toEqual(expected);
    });

    it('should handle leap year dates correctly', () => {
      // Arrange
      const date = new Date('2020-02-29T00:00:00Z');
      const expected = date.toISOString();

      // Act
      const result = getISO8601(date);

      // Assert
      expect(result).toEqual(expected);
    });

    it('should handle dates before 1970 correctly', () => {
      // Arrange
      const date = new Date('1969-12-31T23:59:59Z');
      const expected = date.toISOString();

      // Act
      const result = getISO8601(date);

      // Assert
      expect(result).toEqual(expected);
    });

    it('should handle future dates correctly', () => {
      // Arrange
      const date = new Date('2100-01-01T00:00:00Z');
      const expected = date.toISOString();

      // Act
      const result = getISO8601(date);

      // Assert
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
      // Arrange
      const pastDate = new Date('1989-09-20');
      const expectedYear = pastDate.getFullYear() + year;
      // JavaScript month are 0 indexed
      const expectedMonth = 8;
      const expectedDate = 20;

      // Act
      const result = addYear(year, pastDate);

      // Assert
      expect(result.getFullYear()).toBe(expectedYear);
      expect(result.getMonth()).toBe(expectedMonth);
      expect(result.getDate()).toBe(expectedDate);
    });

    it.each(yearsToAdd)('should add $year year(s) with no date argument', ({ year }) => {
      // Arrange
      const todayDate = now();
      const expectedYear = todayDate.getFullYear() + year;
      // JavaScript month are 0 indexed
      const expectedMonth = todayDate.getMonth();
      const expectedDate = todayDate.getDate();

      // Act
      const result = addYear(year, todayDate);

      // Assert
      expect(result.getFullYear()).toBe(expectedYear);
      expect(result.getMonth()).toBe(expectedMonth);
      expect(result.getDate()).toBe(expectedDate);
    });
  });

  describe('getEpochMs', () => {
    it('should return EPOCH with milliseconds for now with an argument', () => {
      // Arrange
      const date = new Date();
      const epoch = date.valueOf();

      // Act
      const result = getEpochMs(date);

      // Assert
      expect(result).toBe(epoch);
    });

    it('should return EPOCH with milliseconds for now with no argument', () => {
      // Arrange
      const epoch = new Date().valueOf();

      // Act
      const result = getEpochMs();

      // Assert
      expect(result).toBe(epoch);
    });

    it('should return EPOCH with milliseconds for 20/09/1989', () => {
      // Arrange
      const date = new Date('1989-09-20');
      const epoch = date.valueOf();

      // Act
      const result = getEpochMs(date);

      // Assert
      expect(result).toBe(epoch);
    });

    it('should return EPOCH with milliseconds for 01/01/1970', () => {
      // Arrange
      const date = new Date('1970-01-01');

      // Act
      const result = getEpochMs(date);

      // Assert
      expect(result).toBe(0);
    });

    it('should return EPOCH with milliseconds for a future date', () => {
      // Arrange
      const date = new Date('2100-01-01');
      const epoch = date.valueOf();

      // Act
      const result = getEpochMs(date);

      // Assert
      expect(result).toBe(epoch);
    });

    it('should return EPOCH with milliseconds for a leap year date', () => {
      // Arrange
      const date = new Date('2020-02-29');
      const epoch = date.valueOf();

      // Act
      const result = getEpochMs(date);

      // Assert
      expect(result).toBe(epoch);
    });
  });
});
