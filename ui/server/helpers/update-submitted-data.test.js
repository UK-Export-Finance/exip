const {
  mapSubmittedData,
  updateSubmittedData,
} = require('./update-submitted-data');
const { FIELD_IDS } = require('../constants');
const { sanitiseFormData } = require('./sanitise-form-data');

const {
  SINGLE_POLICY_LENGTH,
  MULTI_POLICY_LENGTH,
  POLICY_LENGTH,
} = FIELD_IDS;

describe('sever/helpers/update-submitted-data', () => {
  describe('mapSubmittedData', () => {
    describe(`when ${SINGLE_POLICY_LENGTH} is provided`, () => {
      it('should return policy length field without single/multi prefix', () => {
        const mockFormData = {
          mock: '1',
          [SINGLE_POLICY_LENGTH]: '10',
        };

        const result = mapSubmittedData(mockFormData);

        const expected = {
          mock: '1',
          [POLICY_LENGTH]: '10',
        };

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${MULTI_POLICY_LENGTH} is provided`, () => {
      it('should return policy length field without single/multi prefix', () => {
        const mockFormData = {
          mock: '1',
          [MULTI_POLICY_LENGTH]: '10',
        };

        const result = mapSubmittedData(mockFormData);

        const expected = {
          mock: '1',
          [POLICY_LENGTH]: '10',
        };

        expect(result).toEqual(expected);
      });
    });

    describe('when no single/multi policy length fields are provided', () => {
      it('should return all fields', () => {
        const mockFormData = {
          mock: '1',
        };

        const result = mapSubmittedData(mockFormData);

        const expected = {
          mock: '1',
        };

        expect(result).toEqual(expected);
      });
    });
  });

  describe('updateSubmittedData', () => {
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

        const mappedFormData = mapSubmittedData(mockFormData);

        const expected = {
          ...mockExistingData,
          ...sanitiseFormData(mappedFormData),
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

        const mappedFormData = mapSubmittedData(mockFormData);

        const expected = sanitiseFormData(mappedFormData);

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
});
