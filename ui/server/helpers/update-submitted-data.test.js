const updateSubmittedData = require('./update-submitted-data');
const { sanitiseFormData } = require('./sanitise-form-data');

describe('sever/helpers/update-submitted-data', () => {
  describe('when there is existing data', () => {
    it('should return an object with existing and new, sanitised form data', () => {
      const mockFormData = {
        a: true,
      };

      const mockExistingData = {
        mock: true,
      };

      const result = updateSubmittedData(
        mockFormData,
        mockExistingData,
      );

      const expected = {
        ...mockExistingData,
        ...sanitiseFormData(mockFormData),
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when there is no existing data', () => {
    it('should return an object with new, sanitised form data', () => {
      const mockFormData = {
        a: true,
      };

      const mockExistingData = {};

      const result = updateSubmittedData(
        mockFormData,
        mockExistingData,
      );

      const expected = sanitiseFormData(mockFormData);

      expect(result).toEqual(expected);
    });
  });

  it('should not return _csrf from provided form data', () => {
    const mockFormData = {
      _csrf: '123',
      a: true,
    };

    const mockExistingData = {};

    const result = updateSubmittedData(
      mockFormData,
      mockExistingData,
    );

    const expected = sanitiseFormData({
      a: mockFormData.a,
    });

    expect(result).toEqual(expected);
  });

  describe('when there is no existing or provided data', () => {
    it('should return empty object', () => {
      const mockFormData = {
        _csrf: '123',
      };

      const result = updateSubmittedData(mockFormData);

      expect(result).toEqual({});
    });
  });
});
