import hasFormData from '.';

describe('helpers/has-form-data', () => {
  describe('when a form has a field that is not _csrf', () => {
    it('should return true', () => {
      const mockFormData = {
        _csrf: '1234',
        mockField: true,
      };

      const result = hasFormData(mockFormData);

      expect(result).toEqual(true);
    });
  });

  describe('when a form has a field that is not _csrf', () => {
    it('should return true', () => {
      const mockFormData = {
        _csrf: '1234',
        mockField: true,
      };

      const result = hasFormData(mockFormData);

      expect(result).toEqual(true);
    });
  });

  describe('when a form does NOT have a field other than _csrf', () => {
    it('should return false', () => {
      const mockFormData = { _csrf: '1234' };

      const result = hasFormData(mockFormData);

      expect(result).toEqual(false);
    });
  });

  describe('when no form data is empty', () => {
    it('should return false', () => {
      const result = hasFormData({});

      expect(result).toEqual(false);
    });
  });
});
