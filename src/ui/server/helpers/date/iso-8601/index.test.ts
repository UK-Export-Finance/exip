import { now, getISO8601 } from './index';

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
  });
});
