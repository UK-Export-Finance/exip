const {
  mapSubmittedData,
  updateSubmittedData,
} = require('./update-submitted-data');
const { FIELD_IDS, FIELD_VALUES } = require('../constants');
const { sanitiseFormData } = require('./sanitise-form-data');

const {
  POLICY_TYPE,
  SINGLE_POLICY_LENGTH,
  MULTI_POLICY_LENGTH,
  POLICY_LENGTH,
} = FIELD_IDS;

describe('server/helpers/update-submitted-data', () => {
  describe('mapSubmittedData', () => {
    describe(`when ${POLICY_TYPE} is 'single'`, () => {
      it('should return policy length field with single specific fields', () => {
        const mockFormData = {
          mock: '1',
          [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
          [SINGLE_POLICY_LENGTH]: '10',
        };

        const result = mapSubmittedData(mockFormData);

        const expected = {
          mock: '1',
          [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
          [POLICY_LENGTH]: '10',
          [SINGLE_POLICY_LENGTH]: '10',
        };

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${POLICY_TYPE} is 'multi'`, () => {
      it('should return policy length field with multi specific fields', () => {
        const mockFormData = {
          mock: '1',
          [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTI,
          [POLICY_LENGTH]: '10',
          [MULTI_POLICY_LENGTH]: '10',
        };

        const result = mapSubmittedData(mockFormData);

        const expected = {
          mock: '1',
          [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTI,
          [POLICY_LENGTH]: '10',
          [MULTI_POLICY_LENGTH]: '10',
        };

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${POLICY_TYPE} of 'single' is submitted  and 'multi' fields were previously provided`, () => {
      it('should return policy length field with single specific fields', () => {
        const mockFormData = {
          [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
          [SINGLE_POLICY_LENGTH]: '10',
        };

        const mockExistingData = {
          [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTI,
          [MULTI_POLICY_LENGTH]: '5',
        };

        const result = mapSubmittedData(mockFormData, mockExistingData);

        const expected = {
          [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
          [POLICY_LENGTH]: '10',
          [SINGLE_POLICY_LENGTH]: '10',
        };

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${POLICY_TYPE} of 'multi' is submitted  and 'single' fields were previously provided`, () => {
      it('should return policy length field with single specific fields', () => {
        const mockFormData = {
          [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTI,
          [MULTI_POLICY_LENGTH]: '10',
        };

        const mockExistingData = {
          [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
          [SINGLE_POLICY_LENGTH]: '5',
        };

        const result = mapSubmittedData(mockFormData, mockExistingData);

        const expected = {
          [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTI,
          [POLICY_LENGTH]: '10',
          [MULTI_POLICY_LENGTH]: '10',
        };

        expect(result).toEqual(expected);
      });
    });

    describe('when no policy type fields are provided', () => {
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

        const expectedSanitisedData = sanitiseFormData({
          ...mockExistingData,
          ...mockFormData,
        });

        const expected = mapSubmittedData(expectedSanitisedData);

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

        const expectedSanitisedData = sanitiseFormData({
          ...mockExistingData,
          ...mockFormData,
        });

        const expected = mapSubmittedData(expectedSanitisedData);

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

      const expectedSanitisedData = sanitiseFormData({
        ...mockExistingData,
        a: true,
      });

      const expected = mapSubmittedData(expectedSanitisedData);

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
